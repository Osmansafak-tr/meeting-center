exports.updateObject = (obj, model) => {
  const keys = Object.keys(model);
  keys.forEach((key) => {
    if (obj[key] != undefined) obj[key] = model[key];
  });
};
