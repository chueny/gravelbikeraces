"""Script to seed the datebase"""

import os
import json
from random import choice, randint
from datetime import datetime

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
    average = race['average']
    if average == 0:
        average = None   
    distance = race['distance']
    elevation = race['elevation']
    location = race['location']
    state = race['state']
    gps_lat = race['gps_lat']
    gps_lon = race['gps_lon']
    overview = race['overview']
    img_url = race['img_URL']
    

    db_race = crud.create_race(race_name, 
                                # average, 
                                distance, 
                                elevation, 
                                location, 
                                state, 
                                gps_lat, 
                                gps_lon, 
                                overview, 
                                img_url)
    races_in_db.append(db_race)

model.db.session.add_all(races_in_db)
model.db.session.commit()

for n in range(10):
    name=f'name{n}'
    email = f'user{n}@test.com'
    password = 'test'
    date = datetime.now()

    user = crud.create_user(name, email, password)
    model.db.session.add(user)

    for _ in range(10):
        random_race=choice(races_in_db)
        print(random_race)
        score = randint(1, 5)
        comment = "The energy is unbelievable and the people are so nice! The course is challenging."

        review = crud.create_review(user, random_race, comment, score)
        model.db.session.add(review)

        update_rating = crud.get_average_rating(random_race.race_id)
        random_race.average = update_rating
        model.db.session.add(random_race)

model.db.session.commit()
    