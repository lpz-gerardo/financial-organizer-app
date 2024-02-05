const formatMoney = (amount) => {
    return '$' + String(Number.parseFloat(amount).toFixed(2));
}

const formatPercent = (percent) => {
    return String(Number.parseFloat(percent).toFixed(2) + '%');
}

export {
    formatMoney,
    formatPercent,
}