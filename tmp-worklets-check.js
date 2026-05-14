const plugin = require('react-native-worklets/plugin');
console.log('type', typeof plugin);
const out = plugin();
console.log('keys', Object.keys(out));
console.log('visitor present', typeof out.visitor);
console.log('name', out.name);
