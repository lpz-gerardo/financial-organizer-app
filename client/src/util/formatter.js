const formatMoney = (amount) => {
    return '$' + String(Number.parseFloat(amount).toFixed(2));
}

export {
    formatMoney,
}