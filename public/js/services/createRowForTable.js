function createRowForTable(user) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.append(user);
  tr.append(td);
  return tr;
}

module.exports = { createRowForTable };
