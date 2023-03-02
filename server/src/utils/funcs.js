const createSetWithNewValue = (idsArray, idToAdd) => {
  const set = new Set();
  [...idsArray].forEach((id) => {
    set.add(id.toString());
  });
  set.add(idToAdd);
  return set;
};

module.exports = { createSetWithNewValue };
