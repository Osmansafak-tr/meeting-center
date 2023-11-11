exports.checkValidValue = (currentVal, otherVal) => {
  if (otherVal == undefined || otherVal == null) return currentVal;
  else return otherVal;
};
