'use strict';

// We use a function declaration for initMap because we actually *do* need
// to rely on value-hoisting in this circumstance.
function initMap() {
  const map = new google.maps.Map(document.querySelector('#map'), {
    center: {
        lat: 39.8283,
        lng: -98.5795,
    },
    zoom: 4,
  });
 const raceInfo = new google.maps.InfoWindow();


fetch('/map')
.then((response) => response.json())
.then((races) => {
    
    for (const race of races){

        let average = race.average;
        const displayStar = (average) => {
        if (average == 1){
            return "✩"
        } else if (average == 2){
            return "✩✩"
        } else if (average == 3){
            return "✩✩✩"
        } else if (average ==4){
            return "✩✩✩✩"
        } else if(average ==5){
            return "✩✩✩✩✩"
        }
        }
        
       
        const raceInfoContent = `
        <div class="window-content">
            <div class = "race-thumbail">
                <img src="${race.img_url}" alt="bike race" width="200" height="auto"/>
            </div>
            <div class ="race-info">
                <h1 class="window-title"><a href="/races/${race.race_id}">
                ${race.race_name}</a></h1>
                <p clas="windown-miles">${displayStar(average)}</p>
                <p clas="windown-miles">${race.location}, ${race.state}</p>
                <p clas="windown-miles">${race.distance}mi, ${race.elevation}ft</p>
            </div>
        </div>
        `;

        const raceMarker = new google.maps.Marker({
            position:{
                lat: race.gps_lat, //race.gps_lat
                lng: race.gps_lon, //race.gps_lon
            },
            title: race.race_name,
            // icon:{
            //     url: race.img_url,
            //     scaledSize: new google.maps.Size(50, 50),
            // },
            map,
        });
        raceMarker.addListener('click', ()=> {
            raceInfo.close();
            raceInfo.setContent(raceInfoContent);
            raceInfo.open(map, raceMarker);
        });
    }
})
.catch((err)=> {
    console.log(err);
});
}