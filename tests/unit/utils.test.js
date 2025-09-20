const { validateCredentials } = require('../../src/utils');

test('valid credentials return true', () => {
  expect(validateCredentials('admin','password123')).toBe(true);
});

test('invalid credentials return false', () => {
  expect(validateCredentials('user','wrong')).toBe(false);
});
