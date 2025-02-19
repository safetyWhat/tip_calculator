const stars = document.querySelectorAll('.star');
const subtotal = document.getElementById('subtotal');
const tip = document.getElementById('tipValue');
const total = document.getElementById('totalValue');
// Default rating
let rating = 0;

stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        // Add hover class to current star and all previous stars
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('hover');
        }
    });

    star.addEventListener('mouseleave', () => {
        // Remove hover class from all stars
        stars.forEach(s => s.classList.remove('hover'));
    });
});

stars.forEach((star, index) => {
    star.addEventListener('click', () => { 
        // Add solid class to current star and all previous stars
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('solid');
        }
        // Remove solid class from all stars after current star
        // This is if user changes their mind and clicks a lower star
        for (let i = index + 1; i < stars.length; i++) { 
            stars[i].classList.remove('solid');
        }
        rating = index;
        //console.log(rating);
        //console.log('subtotal: ' + subtotal.value);
        tip.innerHTML = findTip(subtotal.value,findPercent(rating), 'none');
        //console.log(findTip(subtotal.value,findPercent(rating), 'none'));
        total.innerHTML = Number((Number(subtotal.value) + Number(tip.innerHTML))).toFixed(2);
    });
});

const findPercent = (rating) => {
    switch(rating) {
        case 0:
            //console.log('Rating:', rating);
            return 10; // 1 star = 10%
        case 1:
            //console.log('Rating:', rating);
            return 15; // 2 stars = 15%
        case 2:
            //console.log('Rating:', rating);
            return 18; // 3 stars = 18%
        case 3:
            //console.log('Rating:', rating);
            return 20; // 4 stars = 20%
        case 4:
            //console.log('Rating:', rating);
            return 25; // 5 stars = 25%
        default:
            //console.log('Rating:', rating);
            return 0;  // Default case if no match
    }
};

const roundHalf = (total) => {
    return Number((Math.round(total * 2) / 2).toFixed(2));
};

const roundWhole = (total) => {
    return Number(Math.round(total).toFixed(2));
};

const findTip = (subTotal, tipPercent, round) => {
    subTotal = Number(subTotal);
    //console.log('Subtotal: ' + subTotal, 'Tip Percent: ' + tipPercent, 'Round: ' + round);
    const tipDecimal = tipPercent / 100;
    //console.log('Tip Decimal: ' + tipDecimal);
    let tip = Number((subTotal * tipDecimal)).toFixed(2);
    //console.log('Tip: ' + tip);
    const total = Number((subTotal + tip)).toFixed(2);
    /*console.log(
        'Tip Decimal: ' + tipDecimal,
        'Tip: ' + tip,
        'Total: ' + total
    )*/
    //if (round === 'none') return tip;
    if (round === 'whole') tip = Number((roundWhole(total) - subTotal)).toFixed(2);
    else if (round === 'half') tip = Number((roundHalf(total) - subTotal)).toFixed(2);
    return tip;
};

//console.log(findTip(23.65, 20, 'half'));
//console.log(findTip(23.65, 20, 'whole'));
