module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
