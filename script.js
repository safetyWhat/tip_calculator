const stars = document.querySelectorAll('.star');

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
    });
});

const roundHalf = (total) => {
    return Number((Math.round(total * 2) / 2).toFixed(2));
};

const roundWhole = (total) => {
    return Number(Math.round(total).toFixed(2));
};

const findTip = (subTotal, tipPercent, round) => {
    const tipDecimal = tipPercent / 100;
    let tip = Number((subTotal * tipDecimal).toFixed(2));
    const total = Number((subTotal + tip).toFixed(2));
    console.log(
        'Tip Decimal: ' + tipDecimal,
        'Tip: ' + tip,
        'Total: ' + total
    )
    if (round === 'whole') tip = Number((roundWhole(total) - subTotal).toFixed(2));
    else if (round === 'half') tip = Number((roundHalf(total) - subTotal).toFixed(2));
    return tip;
};

console.log(findTip(23.65, 20, 'half'));
console.log(findTip(23.65, 20, 'whole'));
