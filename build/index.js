"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

class Index {
  constructor() {
    this.express = _express2.default.call(void 0, );

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(_cors2.default.call(void 0, ));
    this.express.use(_express2.default.json());
  }

  database() {
    _mongoose2.default.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  routes() {
    this.express.use(_routes2.default);
  }
}

exports. default = new Index().express;
