const averages = document.querySelectorAll('.race-average');
// averages.forEach(average => average.addEventListener('click', displayStar));
averages.forEach(function(ele){
    console.log(ele.innerHTML.split(' ')[3]);
    let value = ele.innerHTML.split(' ')[3];
    displayStar(value);

    const displayStar = (average) => {
        if (average == 1){
            return `${value = "✩"}`
        } else if (average == 2){
            return `${value = "✩✩"}`
        } else if (average == 3){
            return `${value = "✩✩✩"}`
        } else if (average ==4){
            return `${value = "✩✩✩"}`
        } else if(average ==5){
            return `${value = "✩✩✩"}`
        }
    }
    //ele.innerHTML = ""
})

