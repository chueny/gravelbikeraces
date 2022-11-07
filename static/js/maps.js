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
    console.log("hello!");
    console.log(races[0])

    // const raceInfoContent = `
    // <div class="window-content">
    //     <div class = "race-thumbail">
    //         <img src="${races[0].img_url}" alt="bike race"/>
    //     </div>
    //     <h1 class="window-title">${races[0].name}</h1>
    //     <p clas="windown-miles">${races[0].distance}mi, ${races[0].elevation}ft</p>
    // </div>
    // `;

    // const raceMarker = new google.maps.Marker({
    //     position:{
    //         lat: races[0].gps_lat, //44.3953, //race.gps_lat  races[0].gps_lat,
    //         lng: races[0].gps_lon,//-72.9816, //race[0].gps_lon, //race.gps_lon  72.9816,
    //     },
    //     title: races[0].name,
    //     // icon:{
    //     //     url: races[0].img_url, //pin 
    //     //     scaledSize: new google.maps.Size(50, 50),
    //     // },
    //     map,
    // });
    // raceMarker.addListener('click', ()=> {
    //     raceInfo.close();
    //     raceInfo.setContent(raceInfoContent);
    //     raceInfo.open(map, raceMarker);
    // });


    for (const race of races){
        const raceInfoContent = `
        <div class="window-content">
            <div class = "race-thumbail">
                <img src="${race.img_url}" alt="bike race"/>
            </div>
            <h1 class="window-title">${race.name}</h1>
            <p clas="windown-miles">${race.distance}mi, ${race.elevation}ft</p>
        </div>
        `;

        const raceMarker = new google.maps.Marker({
            position:{
                lat: race.gps_lat, //race.gps_lat
                lng: race.gps_lon, //race.gps_lon
            },
            title: race.name,
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