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
