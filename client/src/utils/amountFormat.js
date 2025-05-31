export const amountFormat = (amount) => {
  const decimalPart = (amount % 1).toFixed(2).substr(2);
  const integerPart = Math.floor(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "RS. " + integerPart + (decimalPart ? "." + decimalPart : ".00");
};

export const simpleAmountFormat = (amount) => {
  const decimalPart = (amount % 1).toFixed(1).substr(2);
  const integerPart = Math.floor(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return  integerPart + (decimalPart ? "." + decimalPart : ".0");
};

