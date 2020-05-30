"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _index = require('./index'); var _index2 = _interopRequireDefault(_index);

_index2.default.listen(process.env.PORT || 3333);
