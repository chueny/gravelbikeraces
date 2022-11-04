
function initMap() {
    const usCoords ={
        lat: 37.0902,
        lng: -95.7129,
    };

    const basicMap = new google.maps.Map(document.querySelector('#map'),{
        center: usCoords,
        zoom:4,
    });
}

const heckMarker = new google.maps.Marker({
    position: usCoords,
    title: "Heck of the North",
    map:basicMap,
});