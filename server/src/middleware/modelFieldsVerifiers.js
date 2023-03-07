function verifyRequestFields(_model, filterArray = []) {
  return (req, res, next) => {
    const wrongFields = [];

    const bodyFields = Object.keys(req.body);
    let schemaFields = Object.keys(_model.schema.obj);
    console.log(req.body);

    if (filterArray.length > 0) {
      schemaFields = schemaFields.filter((el) => {
        let ok = true;
        filterArray.forEach((filter) => {
          if (el == filter) ok = false;
        });
        return ok;
      });
    }
    const verified = bodyFields.every((el) => {
      if (!schemaFields.includes(el)) {
        wrongFields.push(el);
        return false;
      }
      return true;
    });
    if (verified) return next();
    else
      return next({
        message: "wrong fields in request :" + wrongFields,
        name: "wrongFields",
        status: 400,
      });
  };
}

module.exports = { verifyRequestFields };
