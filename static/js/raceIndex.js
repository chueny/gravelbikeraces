const searches = document.querySelectorAll('.search');
searches.forEach(search => search.addEventListener('click', removeHidden));

function removeHidden(e){
  console.log(`What is this:${e.target.name}`);
  if (e.target.name == "link"){
    document.getElementById("grid").hidden = true;
    document.getElementById("link").hidden = false;
  } else{
    document.getElementById("grid").hidden = false;
    document.getElementById("link").hidden = true;
  }
  
}

fetch('/map')
.then((response) => response.json())
.then((races) => {
   
    console.log(`Index: ${races}`);
   
    // for (const race of races){
    //     const raceInfoContent = `
    //     <div>
    //         <div class = "race-thumbail">
    //             <img src="${race.img_url}" alt="bike race"/>
    //         </div>
    //         <h1 class="window-title"><a href="/races/${race.race_id}">
    //         ${race.race_name}</a></h1>
    //         <p clas="windown-miles">${race.location}</p>
    //         <p clas="windown-miles">${race.distance}mi, ${race.elevation}ft</p>
    //     </div>
    //     `}

      
})
.catch((err)=> {
    console.log(err);
});