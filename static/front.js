// Race Index Page
// onclick button displays that particular section and hides other displays
let linkBtn = document.querySelector('#get_link');
let gridBtn = document.querySelector('#get_grid');
let mapBtn = document.querySelector('#get_map');

linkBtn.addEventListener("click",() => {
      document.getElementById("grid").hidden = true;
      document.getElementById("map").hidden = true;
      document.getElementById("link").hidden = false;
    },
    false
);

gridBtn.addEventListener("click",() => {
      document.getElementById("grid").hidden = false;
      document.getElementById("map").hidden = true;
      document.getElementById("link").hidden = true;
    },
    false
);

mapBtn.addEventListener("click",() => {
      document.getElementById("grid").hidden = true;
      document.getElementById("map").hidden = false;
      document.getElementById("link").hidden = true;
    },
    false
);