function filterByDistance(value) {
    // console.log(`ValueDistance:${value}`)
    document.getElementById("grid").hidden = true; 
    document.getElementById("link").hidden = true;
    resetHiddenSearch();
  
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