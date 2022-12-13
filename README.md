

# Gravel Bike Races 

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

Gravel Bike Races allows users to view gravel races as pins on Google Map.   Clicking pins will show additional race information. Users can search races, create an account, add a new race, rate and review a race. Find your next gravel bike race! 

<details>
<summary>Table of Contents</summary>

## Table of Contents
* Title
* Description
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies)
* [License](#license)
* [Contributing](#contributing)
* [Screenshots](#screenshots)

</details>

## Installation
After cloning this git repo, run the following commands in your terminal:
- virtualenv env
- source env/bin/activate 
- pip3 install -r requirements 
- Google API Key (see below)
- python3 seed_database.py 
- python3 server.py.  

You'll need to get a Google API key (https://developers.google.com/maps/documentation/javascript/get-api-key) to create a secrets.sh file and replace my key with your key in the server.py file. 

## Usage
Navigate to (http://3.21.21.164/) to start using this app.

## Technologies Used
- Python
- Flask
- Jinja
- JavaScript
- HTML/CSS
- PostgresSQL
- Bootstrap 5
- Google MAP API
- Google Geocode API

## License
This repository uses an open-source license. Please check the readme badges or refer to the license documentation in the repository for more information.

## Contributing

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## Screenshots

<img src="static/img/homepage.png" alt="homepage of google map with pins"/>
<img src="static/img/find.png" alt="homepage of google map with pins"/>
<img src="static/img/add-race.png" alt="homepage of google map with pins"/>
<img src="static/img/profile.png" alt="homepage of google map with pins"/>
<img src="static/img/rate.png" alt="homepage of google map with pins"/>
