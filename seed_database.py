"""Script to seed the datebase"""

import os
import json
from random import choice, randint
#from datetime import datetime

import crud
import model
import server

os.system('dropdb reviews')
os.system('createdb reviews')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/races.json') as f:
    race_data = json.loads(f.read())

races_in_db = []
for race in race_data:
    race_name = race['race_name']
    distance = race['distance']
    elevation = race['elevation']
    location = race['location']
    state = race['state']
    overview = race['overview']
    img_url = race['img_URL']
    

    db_race = crud.create_race(race_name, distance, elevation, location, state, overview, img_url)
    races_in_db.append(db_race)

model.db.session.add_all(races_in_db)
model.db.session.commit()

for n in range(10):
    email = f'user{n}@test.com'
    password = 'test'

    user = crud.create_user(email, password)
    model.db.session.add(user)

    for _ in range(10):
        random_race=choice(races_in_db)
        score = randint(1, 5)
        comment = "Random review here"

        review = crud.create_review(user, random_race, score, comment)
        model.db.session.add(review)

model.db.session.commit()
    