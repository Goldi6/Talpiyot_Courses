const errorLogger = (err, req, res, next) => {
  console.log("ERROR HANDLER");
  console.log(err.name);
  console.log(err.message);
  console.log(Object.keys(err));
  console.log(err);
  console.log("END");
  next(err);
  //console.log(err.code);
};

module.exports = errorLogger;
