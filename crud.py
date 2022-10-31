"""CRUD operations."""

from model import db, User, Race, Review, connect_to_db

def create_user(email, password):
    """Create and return a new user"""

    user = User(email, password)

    return User

def get_all_users():
    """Return all users"""

    return User.query.all()


def get_user_by_id(user_id):
    """Return user by id"""
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return user by email"""
    return User.query.filter(User.email == email).first()

def create_race(name, distance, elevation, state):
    """Create race and return a new race"""

    race = Race(race_name = name, distance = distance, elevation= elevation, state = state)

def get_all_races():
    """Return all races"""
    return Race.query.all()

def get_race_by_id(race_id):
    """Return a race by id"""

    return Race.query.get(race_id)

def create_review(user, race, score, review):
    """Create and return a race review"""

    review = Review(user=user, race=race, score=score, review=review)

    return review

##function to update and handle the score for REVIEW 



if __name__ == '__main__':
    from server import app
    connect_to_db(app)