const getAmount = (prices, currency) =>
   prices.find(({ currency: { symbol } }) => symbol === currency).amount;

const getCartDetails = (cart, currency) => {
   const totalQuantity = cart
      .map(({ quantity }) => quantity)
      .reduce((current, accumulator) => current + accumulator, 0);

   let subTotal = cart
      .map(
         ({ quantity, productDetails: { prices } }) =>
            quantity * getAmount(prices, currency)
      )
      .reduce((current, accumulator) => current + accumulator, 0);

   subTotal = parseFloat(Number.parseFloat(subTotal).toFixed(2));
   const taxPercentage = 21;
   const tax = parseFloat(
      Number.parseFloat((taxPercentage / 100) * subTotal).toFixed(2)
   );
   const totalCost = parseFloat(Number.parseFloat(subTotal + tax).toFixed(2));

   return {
      totalQuantity,
      subTotal,
      taxPercentage,
      tax,
      totalCost
   };
};
export { getAmount, getCartDetails };
