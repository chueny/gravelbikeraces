"""Models for bike racint app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """User"""
    
    __tablename__ = "users"
    
    user_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique = True)
    password = db.Column(db.String)
    
    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"
        
    reviews = db.relationship('Review', back_populates = "user")
    likes = db.relationship('Like', back_populates = "user")


class Race(db.Model):
    """Race"""
    
    __tablename__ = "races"
    
    race_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    race_name = db.Column(db.String)
    average = db.Column(db.Integer)
    location = db.Column(db.String)
    organizer = db.Column(db.String)
    distance = db.Column(db.Integer)
    elevation = db.Column(db.Integer)
    overview = db.Column(db.Text)
    gps_lat = db.Column(db.Float)
    gps_lon = db.Column(db.Float)
    gps_route = db.Column(db.String)
    state = db.Column(db.String)
    img_url = db.Column(db.String)
    
    def __repr__(self):
        return f"<Race race_id={self.race_id} race_name={self.race_name} distance={self.distance}>"
        
    reviews = db.relationship('Review', back_populates = "race")
    likes = db.relationship('Like', back_populates = "race")

class Review(db.Model):
    
    """A bike review"""
    __tablename__ = "review"
    
    review_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    score = db.Column(db.Integer)
    review = db.Column(db.Text)
    date = db.Column(db.DateTime) ##datetime.now when called on server.py 
    race_id = db.Column(db.Integer, db.ForeignKey("races.race_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    
    def __repr__(self):
        return f"<Review review_id={self.review_id} score={self.score}>"
    
    user = db.relationship('User', back_populates = "reviews")
    race = db.relationship('Race', back_populates = "reviews")


class Like(db.Model):
    """ Like a race """
    __tablename__ = "like"

    like_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    race_id = db.Column(db.Integer, db.ForeignKey("races.race_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    def __repr__(self):
        return f"<Like like_id={self.like_id} user_id={self.user_id}>"
    
    user = db.relationship('User', back_populates = "likes")
    race = db.relationship('Race', back_populates = "likes")



def connect_to_db(flask_app, db_uri="postgresql:///reviews", echo=False):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app
    connect_to_db(app)