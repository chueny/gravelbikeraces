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
    //console.log("hello!");
    //console.log(races);
    // console.log(`data:`${data});
    for (const race of races){
        const raceInfoContent = `
        <div class="window-content">
            <div class = "race-thumbail">
                <img src="${race.img_url}" alt="bike race"/>
            </div>
            <h1 class="window-title"><a href="/races/${race.race_id}">
            ${race.race_name}</a></h1>
            <p clas="windown-miles">${race.location}</p>
            <p clas="windown-miles">${race.distance}mi, ${race.elevation}ft</p>
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