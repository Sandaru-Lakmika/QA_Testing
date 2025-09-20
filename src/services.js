const items = []; // in-memory demo

function addItem(name) {
  if (!name || !name.trim()) {
    const err = new Error('Item name required');
    err.status = 400;
    throw err;
  }
  const item = { id: Date.now(), name: name.trim() };
  items.push(item);
  return item;
}

function getItems() {
  return items;
}

module.exports = { addItem, getItems };
