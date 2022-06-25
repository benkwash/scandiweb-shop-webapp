const handleAsyncFunction = (asyncFunction, ...functionParams) => {
   try {
      return asyncFunction(...functionParams);
   } catch (error) {
      alert('Error', error);
      //do something useful later
   }
};

export default handleAsyncFunction;
