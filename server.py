"""Server for bike races app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db, db
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():
    """Show homepage""" 
    races = crud.get_all_races()
    return render_template('homepage.html', races = races)

@app.route('/races')
def all_races():
    """View all races."""

   #This route has a view of google maps
   #When a pin is clicked here, we link the items here to view

    return render_template("all_races.html")


@app.route('/races/<race_id>')
def show_race(race_id):
    """Show details on a race"""
    race = crud.get_race_by_id(race_id)

    return render_template("race_details.html", race=race)


@app.route('/users')
def show_users():
    """Shows all users"""
    users = crud.get_all_users()
    return render_template("users.html", users = users) 


@app.route('/login')
def get_login_page():

     return render_template("login.html")

@app.route('/login', methods=["POST"])
def login_user():
    """Login to a user account"""
    # print(f"IN THE LOGIN ROUTE")
    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or passward you entered was incorrect!")
        # print(f"YOU ARE NOT A USER")
        return redirect("/create")
    else:
        session['user_email'] = user.email
        flash(f"welcome back, {user.email}")

    return redirect("/")

@app.route('/create')
def show_login_page():
    """This route commented out b/c the one below does both"""
    return render_template("create.html")

@app.route('/create', methods=["POST"])
def create_user():
    """Create a user account"""
    email = request.form.get("email")
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
        flash("You already have an account. Please try loggin in.")
        # print(f"USER EXITS??")
    else:
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        flash("Account created. Please log in.")
        # print(f"CREATE USER???")

    return redirect("/login")


#We do weant to create a route for users and what they reviewed or atesd
@app.route('/update_rating', methods = ["POST"])
def update_score():
    
    review_id = request.json["review_id"]
    ##WHAT IS LINE 99 SAY? WEHRE ARE WE GETTTING THAT JSEON FILE ##
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

        review = crud.create_review(user, race, review_score, int(new_review))
        db.session.add(review)
        db.session.commit()

        flash(f"You rated {review_score} out of 5 and wrote a review for this race!")
       
    return redirect(f"/races/{race_id}")

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
