const searches = document.querySelectorAll('.search');
searches.forEach(search => search.addEventListener('click', removeHidden));

function handleLinkClick() {
  document.getElementById("grid").hidden = true;
  document.getElementById("link").hidden = false; 
  resetHiddenSearch(); 
}

function handleGridClick() {
  // console.log("inside handlegripclick");
  document.getElementById("grid").hidden = false; 
  document.getElementById("link").hidden = true;
  resetHiddenSearch();
}

function resetHiddenSearch(){
  //initializes all cards attributes hidden to true;
  raceCards = document.querySelectorAll('.race-card');
  for (const card of raceCards){
    card.hidden = true;
  }
}

function filterByAvg(value) {
  console.log(value)
  document.getElementById("grid").hidden = true; 
  document.getElementById("link").hidden = true;
  resetHiddenSearch();

  if(value == 1){
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      average = card.dataset.average;
      if (average == value){
        card.hidden = false;
      }
    }
  }else if (value == 2) {
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      average = card.dataset.average;
      if (average == value){
        card.hidden = false;
      }
    }
  }else if (value == 3) {
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      average = card.dataset.average;
      if (average == value){
        card.hidden = false;
      }
    }
  }else if (value == 4) {
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      average = card.dataset.average;
      if (average == value){
        // console.log(`card:`,card);
        card.hidden = false;
      }
    }
  } else if (value == 5){
    // handleAvgSearch();
    raceCards = document.querySelectorAll('.race-card');
    for (const card of raceCards){
      average = card.dataset.average;
      if (average ==value){
        card.hidden = false;
      }
    }
  }
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
      //we want to display link all the time, remove grid cause it doesnt matter now
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