const stars = document.querySelectorAll('.star');
const subtotal = document.getElementById('subtotal');
const tip = document.getElementById('tipValue');
const total = document.getElementById('totalValue');
const wholeToggle = document.getElementById('wholeToggle');
const viewToggle = document.getElementById('viewToggle');
const setTip = document.getElementById('setTip');

// Default rating
let rating = 0;
// Default round
let round = 'none';
// Default percent
let percent = 10;

viewToggle.addEventListener('click', () => {
    if (viewToggle.innerHTML === 'toggle_off') {
        viewToggle.innerHTML = 'toggle_on';
        setTip.innerHTML = `
            <div id="setTipText" class="manrope setTipUpper">Tip Percent:</div>
                <div id="setTipFunction" class="setTipLower">
                    <input 
                        type="number"
                        min="10"
                        max="100"
                        step="1"
                        placeholder="15"
                        class="manrope numbers"
                        title="Enter a percentage between 10 and 100"
                    />
                <span id="percentSymbol" class="manrope labels">%</span>
            </div>
        `;
        tip.innerHTML = '0.00';
        total.innerHTML = '0.00';
        const percentInput = setTip.querySelector('input');
        percentInput.addEventListener('input', () => {
            percent = percentInput.value;
            tip.innerHTML = findTip(subtotal.value, percent, round);
            total.innerHTML = (Number(subtotal.value) + Number(tip.innerHTML)).toFixed(2);
        });
        percent = 15;
        tip.innerHTML = findTip(subtotal.value, percent, round);
        total.innerHTML = (Number(subtotal.value) + Number(tip.innerHTML)).toFixed(2);
    } else {
        viewToggle.innerHTML = 'toggle_off';
        setTip.innerHTML = `
            <div id="setTipText" class="manrope setTipUpper">Rate Your Server:</div>
            <div id="setTipFunction" class="setTipLower">
                <span 
                    id="star1" 
                    class="star material-symbols-outlined solid"
                    title="10% tip">
                    star
                </span>
                <span 
                    id="star2" 
                    class="star material-symbols-outlined"
                    title="15% tip">
                    star
                </span>
                <span
                    id="star3" 
                    class="star material-symbols-outlined"
                    title="18% tip">
                    star
                </span>
                <span
                    id="star4"
                    class="star material-symbols-outlined"
                    title="20% tip">
                    star
                </span>
                <span
                    id="star5"
                    class="star material-symbols-outlined"
                    title="25% tip">
                    star
                </span>
            </div>
        `;
        tip.innerHTML = '0.00';
        total.innerHTML = '0.00';
        const newStars = document.querySelectorAll('.star');
        attachStarListeners(newStars);
        rating = 0;
        percent = 10;
        tip.innerHTML = findTip(subtotal.value, percent, round);
        total.innerHTML = (Number(subtotal.value) + Number(tip.innerHTML)).toFixed(2);
    }
});

wholeToggle.addEventListener('click', () => {
    if (wholeToggle.innerHTML === 'toggle_off') {
        round = 'whole';
        wholeToggle.innerHTML = 'toggle_on';
        wholeToggle.classList.add('active');
    } else {
        round = 'none';
        wholeToggle.innerHTML = 'toggle_off';
        wholeToggle.classList.remove('active');
    }
    tip.innerHTML = findTip(subtotal.value,findPercent(rating), round);
    total.innerHTML = Number((Number(subtotal.value) + Number(tip.innerHTML))).toFixed(2);
});

const attachStarListeners = (stars) => {
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
            tip.innerHTML = findTip(subtotal.value,findPercent(rating), round);
            //console.log(findTip(subtotal.value,findPercent(rating), 'none'));
            total.innerHTML = Number((Number(subtotal.value) + Number(tip.innerHTML))).toFixed(2);
        });
    });
};

attachStarListeners(stars);

const findPercent = (rating) => {
    switch(rating) {
        case 0:
            //console.log('Rating:', rating);
            percent = 10; // 1 star = 10%
            break;
        case 1:
            //console.log('Rating:', rating);
            percent = 15; // 2 stars = 15%
            break;
        case 2:
            //console.log('Rating:', rating);
            percent = 18; // 3 stars = 18%
            break;
        case 3:
            //console.log('Rating:', rating);
            percent = 20; // 4 stars = 20%
            break;
        case 4:
            //console.log('Rating:', rating);
            percent = 25; // 5 stars = 25%
            break;
        default:
            //console.log('Rating:', rating);
            percent = 0;  // Default case if no match
    }
    return percent;
};

subtotal.addEventListener('input', (e) => {
    // Remove any non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Insert decimal point
    const length = value.length;
    const dollars = value.substring(0, length - 2);
    const cents = value.substring(length - 2);
    
    // Format and set the value
    e.target.value = `${dollars}.${cents}`;
});

subtotal.addEventListener('input', () => {
    tip.innerHTML = findTip(subtotal.value,findPercent(rating), round);
    total.innerHTML = Number((Number(subtotal.value) + Number(tip.innerHTML))).toFixed(2);
});

// Prevent non-numeric input
subtotal.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
        e.preventDefault();
    }
});

const roundWhole = (total) => {
    return Number(Math.round(total).toFixed(2));
};

const findTip = (subTotal, tipPercent, round) => {
    subTotal = Number(subTotal);
    //console.log('Subtotal: ' + subTotal, 'Tip Percent: ' + tipPercent, 'Round: ' + round);
    const tipDecimal = tipPercent / 100;
    //console.log('Tip Decimal: ' + tipDecimal);
    let tip = Number((subTotal * tipDecimal));
    //console.log('Tip: ' + tip);
    let total = Number((subTotal + tip));
    /*console.log(
        'Tip Decimal: ' + tipDecimal,
        'Tip: ' + tip,
        'Total: ' + total
    )*/
    //if (round === 'none') return tip;
    if (round === 'whole') tip = Number((roundWhole(total) - subTotal));
    return tip.toFixed(2);
};

//console.log(findTip(23.65, 20, 'half'));
//console.log(findTip(23.65, 20, 'whole'));
