const searches = document.querySelectorAll('.search');
searches.forEach(search => search.addEventListener('click', removeHidden));

function handleLinkClick() {
  document.getElementById("grid").hidden = true;
  document.getElementById("link").hidden = false; 
  resetSearchHidden();
}

function handleGridClick() {
  document.getElementById("grid").hidden = false; 
  document.getElementById("link").hidden = true;
  resetSearchHidden();  
}

function resetSearchHidden(){
  //initializes all cards attributes hidden to true;
  raceCards = document.querySelectorAll('.race-card');
  for (const card of raceCards){
    card.hidden = true;
  }
}

function filterByAvg(value) {
  console.log(`Value:${value}`)
  console.log(value)

}

function filterByDistance(value) {
  // console.log(`ValueDistance:${value}`)
  document.getElementById("grid").hidden = true; 
  document.getElementById("link").hidden = true;
  resetSearchHidden();

  if(value == 25){
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      
      distance = card.dataset.distance;
      if (distance > 1 && distance <=25 ){
        console.log(`card:`,card);
      card.hidden = false;
      }
    }
  } else if (value == 50){
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      distance = card.dataset.distance;
      if (distance > 26 && distance <=50 ){
      card.hidden = false;
      }
    }
  } else if (value == 75){
    console.log(`btn 75`, value)
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      distance = card.dataset.distance;
      if (distance > 51 && distance <=75){
      card.hidden = false;
      }
      }
  } else if (value == 100){
    console.log(`btn 100`, value)
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      distance = card.dataset.distance;
      if (distance > 76 && distance <=100 ){
      card.hidden = false;
      }
      }
  } else{
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      distance = card.dataset.distance;
      if (distance > 101){
      card.hidden = false;
      }
    }
  }
}

function filterByElevation(value) {
  document.getElementById("grid").hidden = true; 
  document.getElementById("link").hidden = true;
  resetSearchHidden();
}

function handleFilterButtonClick(type, value) {
  switch(type){
    case "avg":
      //filterByAvg
      filterByAvg(value);
      break;
    case "distance-btn":
      //filterByDistance
      filterByDistance(value);
      break;
    case "elevation":
      filterByElevation(value);
      break;
    default: 
      document.getElementById("grid").hidden = true;
      document.getElementById("link").hidden = true;
  }
}

function removeHidden(e){
  // we're tracking two types of events: 
  // 1. Link vs Grid display
  // 2. What kind of races aka filter (rating, distance, elvation)


  // how do we know what event button was clicked?
  // if it is a filter buton then the class is of the form
  // avg: search avg
  // distance: search distance-btn
  // elvation: search elevation

  // to know what type of filter we can grab the second word in the class
  let buttonClickType = e.target.className.split(' ')[1];

  // if this is a grid vs link then
  // handle display click

  // if this is a filter then
  // handle filter click
  if(['avg', 'distance-btn', 'elevation'].includes(buttonClickType)) {
    handleFilterButtonClick(buttonClickType, e.target.name)
  } else {
    switch(e.target.name){
      case "link":
        handleLinkClick();
        break;
      case "grid":
        handleGridClick();
        break;
      default:
        document.getElementById("grid").hidden = true;
        document.getElementById("link").hidden = true;
    }
  }
}