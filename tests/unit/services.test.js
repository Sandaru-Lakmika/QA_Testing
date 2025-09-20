const { addItem, getItems } = require('../../src/services');

test('addItem stores a trimmed item', () => {
  const created = addItem('  Milk  ');
  expect(created.name).toBe('Milk');
  expect(getItems().some(i => i.name === 'Milk')).toBe(true);
});

test('addItem throws on empty name', () => {
  expect(()=>addItem('')).toThrow('Item name required');
});
