const searches = document.querySelectorAll('.search');
searches.forEach(search => search.addEventListener('click', removeHidden));

function handleLinkClick() {
  document.getElementById("grid").hidden = true;
  document.getElementById("link").hidden = false;
}

function handleGridClick() {
  document.getElementById("grid").hidden = false;
  document.getElementById("link").hidden = true;
}

function filterByAvg(value) {

}

function handleFilterButtonClick(type, value) {
  switch(type){
    case "avg":
      //filterByAvg
      filterByAvg(value);
      break;
    case "distance-btn":
      //filterByDistance
      break;
    case "elevation":
      //filterByElevation
      break;
    default:
      document.getElementById("grid").hidden = true;
      document.getElementById("link").hidden = true;
  }
}

function removeHidden(e){
  console.log(`What is this:${e.target.name}`);
  
  // there's 2 types of events you're tracking:
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


//1option 

// fetch('/map')
// .then((response) => response.json())
// .then((races) => {
//     console.log(races);
//     //console.log(`Index: ${JSON.stringify(races)}`);
  
//     for (const race of races){
//       //print(race)  ;
//       // `
//       //   <div>
//       //       <div class = "race-thumbail">
//       //           <img src="${race.img_url}" alt="bike race"/>
//       //       </div>
//       //       <h1 class="window-title"><a href="/races/${race.race_id}">
//       //       ${race.race_name}</a></h1>
//       //       <p clas="windown-miles">${race.location}</p>
//       //       <p clas="windown-miles">${race.distance}mi, ${race.elevation}ft</p>
//       //   </div>
//       //   `
//     }
// })
// .catch((err)=> {
//     console.log(err);
// });