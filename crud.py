"""CRUD operations."""

from model import db, User, Race, Review, connect_to_db

def create_user(name, email, password):
    """Create and return a new user"""
    user = User(name= name, email=email, password=password)
    return user

def get_all_users():
    """Return all users"""

    return User.query.all()

def get_user_by_id(user_id):
    """Return user by id"""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return user by email"""
    return User.query.filter(User.email == email).first()

def create_race(race_name, average,  distance, elevation, location, state, gps_lat, gps_lon, overview, img_url):
    """Create race and return a new race"""
    
    race = Race(race_name = race_name, average=average, distance = distance, elevation= elevation, location = location, state = state, gps_lat = gps_lat, gps_lon = gps_lon, overview=overview, img_url = img_url)
    return race

def get_all_races():
    """Return all races"""
    return Race.query.all()

def get_race_by_id(race_id):
    """Return a race by id"""

    return Race.query.get(race_id)

def create_review(user, race, score, date, review):
    """Create and return a race review"""
    return Review(user=user, race=race, score=score, date=date, review = review)

def get_all_reviews():
    """Get reviews by id"""

    return Review.query.all()


def update_score(review_id, new_score):
    """Create and return a race score"""
    score = Review.query.get(review_id)
    review.score = new_score


def star_avg(race_id): # race_id or review_id
    """Calculate the average of the score for a bike race"""
    race = Race.query.get(race_id)
    
    # for race in race.review:
    #     sum = race.average
    


    # avg = int(sum/len)

    # if avg == 1:
    #     avg = "✩"
    # elif avg == 2:
    #     avg = "✩✩"
    # elif avg == 3:
    #     avg = "✩✩✩"
    # elif avg == 4:
    #     avg = "✩✩✩✩"
    # else: 
    #     avg = "✩✩✩✩✩"
    # #is there a way that we can repackage this so 
    # #that we can utilize this funciton for somewhere else?
    # return avg


def add_review(reivew_id, date, new_review):
    """Create and return a race review """
    review = Review.query.get(review_id)
    review.score = new_review
    
def create_like(user_id, date, race_id):
    """Like a race"""

    like = Like(user_id = user_id, race_id=race_id)
    return like

if __name__ == '__main__':
    from server import app
    connect_to_db(app)