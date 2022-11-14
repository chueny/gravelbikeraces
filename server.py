"""Server for bike races app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, json)
from model import connect_to_db, db
import crud
import os
import requests 

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined
google_API = os.environ['MY_API_KEY']
geocode_key = os.environ['GEOCODE_KEY']


@app.route('/')
def homepage():
    """Show homepage""" 
    # races = crud.get_all_races()

    return render_template('homepage.html', MY_API_KEY = google_API)

@app.route('/map')
def show_map():
    """Shows data for the map"""
    all_races = crud.get_all_races()
    
    races =[]

    #dict_races outside, means the keys are unique and the values get replace each time
    for race in all_races:
        dict_races = {} #new dict each time
        dict_races['race_id'] = race.race_id
        dict_races['average'] = race.average
        dict_races['race_name'] = race.race_name
        dict_races['distance'] = race.distance
        dict_races['elevation'] = race.elevation
        dict_races['gps_lat'] = race.gps_lat
        dict_races['gps_lon'] = race.gps_lon
        dict_races['img_url'] = race.img_url
        dict_races['location'] = race.location

        races.append(dict_races)
    
    return jsonify(races)


@app.route('/races')
def all_races():
    """View all races."""

    races = crud.get_all_races()
    # avg = []
    # for race in races:
    #     if race.average == 1:
    #         return "✩"
    #     if race.average == 2:
    #         return "✩✩"
    #     if race.average == 3:
    #         return "✩✩✩"
    #     if race.average == 4:
    #         return "✩✩✩✩"
    #     if race.average == 5:
    #         return "✩✩✩✩✩"

    # unstructure the variables?
    # do something with the races.averge 
    # (for race in races etc. etc.)

    return render_template("race_index.html", races=races)


@app.route('/races/<race_id>')
def show_race(race_id):
    """Show details on a race"""
    race = crud.get_race_by_id(race_id)
    avg = crud.star_avg(race_id)
    
    return render_template("race_details.html", race=race, avg = avg)


@app.route('/users')
def all_users():
    """Shows all users"""
    users = crud.get_all_users()
    return render_template("users.html", users = users) 


@app.route('/users/<user_id>')
def show_users(user_id):
    """Shows user details"""

    user =crud.get_all_users(user_id)

    return render_template("users.html", user = user)

@app.route('/login')
def get_login_page():

     return render_template("login.html")

@app.route('/login', methods=["POST"])
def login_user():
    """Login to a user account"""
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or passward you entered was incorrect!")
        # print(f"YOU ARE NOT A USER")
        return redirect("/signup")
    else:
        session['user_email'] = user.email
        flash(f"welcome back, {user.email}")

    return redirect("/profile") ## REDIRECT TO PROFILE 

@app.route('/profile')
def show_profile_page():
    """Shows a user's profile page."""
    logged_in_email = session.get('user_email')
    user = crud.get_user_by_email(logged_in_email)
    #class 

    if logged_in_email is None:
        flash("You must be log in to rate a race!")
    else:
        return render_template("profile.html", user=user)


@app.route('/signup')
def show_login_page():
    """This route commented out b/c the one below does both"""
    return render_template("signup.html")

@app.route('/signup', methods=["POST"])
def signup_user():
    """Signup for auser account"""
    name = request.form.get('name')
    email = request.form.get("email")
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
        flash("You already have an account. Please try loggin in.")
        # print(f"USER EXITS??")
    else:
        user = crud.create_user(name, email, password)
        db.session.add(user)
        db.session.commit()
        flash("Account created. Please log in.")
        # print(f"CREATE USER???")

    return redirect("/login")


#We do weant to create a route for users and what they reviewed or atesd
@app.route('/update_rating', methods = ["POST"])
def update_score():
    
    review_id = request.json["review_id"]
    updated_score = request.JSON["updated_score"]
    crud.update_score(review_id, updated_score)

    new_review = request.form.get('review')
    crud.add_review(review_id, new_review)
    db.session.commit()

    return "Success"


@app.route('/races/<race_id>/ratings', methods =["POST"])
def create_rating(race_id):
    """Create a new rating and review for the race """
    logged_in_email = session.get('user_email')
    review_score = request.form.get('rating')
    new_review = request.form.get('review')

    if logged_in_email is None:
        flash("You must be log in to rate a race!")
    elif not review_score and not new_review:
        flash("Error: you didn't select a score nor write a review.")
    else:
        user = crud.get_user_by_email(logged_in_email)
        race = crud.get_race_by_id(race_id)

        review = crud.create_review(user, race, int(review_score), new_review)
        db.session.add(review)
        db.session.commit()

        flash(f"You rated {review_score} out of 5 and wrote a review for this race!")
       
    return redirect(f"/races/{race_id}")


@app.route('/add-race')
def add_race(): 
    """"""
    #NOT SURE THIS IS WORKING PROPERLY THERE ARE BUGS 
    logged_in_email = session.get('user_email')
    
    if logged_in_email is None:
        flash("You must be logged in to create a new race!")
        return redirect("/login")
    else: 
        return render_template("add_race.html")


@app.route('/fetch-geolocation', methods=["POST"])
def fetch_gelocation(): #do we need a userId?
    """Create a new race and adds it to the database"""

    race_name = request.form.get('race')
    average = request.form.get('average')
    distance = request.form.get('distance')
    elevation = request.form.get('elevation')
    location = request.form.get('city')
    state = request.form.get('state')
    overview = request.form.get('overview')
    img_url = request.form.get('img_url')
    
    # use city, state and input into google geocode API and make a resquest 
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    url = url + location +',+' + state + '&key=' + geocode_key
   
    
    res = requests.get(url)
    geo_data = res.json()
    #print(geo_data)
    try:
        gps_lat = geo_data['results'][0]['geometry']['location']['lat']
        gps_lon = geo_data['results'][0]['geometry']['location']['lng']
    except:
        flash(""" Location not valid. Try entering another city and state. """)
    
    race = crud.create_race(race_name = race_name, 
                            average = average,
                            distance = distance, 
                            elevation= elevation, 
                            location = location, 
                            state = state, 
                            gps_lat = gps_lat, 
                            gps_lon = gps_lon, 
                            overview=overview, 
                            img_url = img_url)
    db.session.add(race)
    db.session.commit()

    return redirect("/") 


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
