"""Testsq for Gravel Bike Racing app."""

from unittest import TestCase
from server import app
from model import connect_to_db, db, example_data
from flask import session

class GravelTests(TestCase): 
    """Tests for my gravel bike racing site."""

    def setUp(self):
        """Code to run before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Can we reach the homepage?"""

        result = self.client.get("/")
        self.assertIn(b"a visual overview", result.data)

    def test_no_profile_yet(self):
        """Do users who haven't SIGNED in see the correct view?"""

        result = self.client.get("/")
        self.assertIn(b"Filter races", result.data)
        

    def test_add_race(self):
        """Do logged in users see the correct view?"""

        result = self.client.get("/")
        self.assertIn(b"Add a new race!", result.data)


class GravelTestsDatabse(TestCase):
    """Flask test that uses database.""" 

    def setUp(self):
        """Stuff to do before every test"""
        self.client = app.test_client()
        app.config['TESTING'] = True

        connect_to_db(app, "postgresql:///testdb") 

        # Create tables and add sample data
        db.create_all()
        example_data()


    def test_login(self):
        """Test login page"""

        result = self.client.post("/login", 
                                data={"name": "chue", "email": "chue@gmail.com", "password": "chue"},
                                follow_redirects=True)
        self.assertIn(b"Welcome back", result.data)  #Is this supposed to be found in the login? Or profil?

   ## test failed login 
   ## test if account already exists via signup

#good test case is to check for null. if null, then false test 
#use the link below to do the tests 
#https://fellowship.hackbrightacademy.com/materials/t4/exercises/testing-py/further-study.html
#https://fellowship.hackbrightacademy.com/materials/t4/lectures/testing-2/

if __name__ == "__main__":
    import unittest
    unittest.main()