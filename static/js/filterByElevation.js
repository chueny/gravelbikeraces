function filterByElevation(value) {
    console.log("elevation:", value);
    document.getElementById("grid").hidden = true; 
    document.getElementById("link").hidden = true;
    resetHiddenSearch();
  
    if(value == 500){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
        //console.log(elevation);
        if (elevation > 1 && elevation <=500 ){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } else if(value == 501){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
        //console.log(elevation);
        if (elevation > 500 && elevation <=1000 ){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } else if(value == 1001){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
        //console.log(elevation);
        if (elevation > 101 && elevation <=2000 ){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } else if(value == 2001){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
        //console.log(elevation);
        if (elevation > 2001 && elevation <=3000 ){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } else if(value == 3001){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
       // console.log(elevation);
        if (elevation > 3001 && elevation <=4000 ){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } else if (value == 4001){
      raceCards = document.querySelectorAll('.race-card');
      for (const card of raceCards){
        elevation = card.dataset.elevation;
        console.log(elevation);
        if (elevation > 4001){
         // console.log(`card:`,card);
        card.hidden = false;
        }
      }
    } 
  }