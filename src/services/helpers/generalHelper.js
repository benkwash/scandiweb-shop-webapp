const getAmount = (prices, currency) =>
   prices.find(({ currency: { symbol } }) => symbol === currency).amount;

export { getAmount };
