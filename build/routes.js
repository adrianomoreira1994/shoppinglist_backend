"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ProductController = require('./controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);

const routes = new (0, _express.Router)();

routes.get('/products', _ProductController2.default.index);
routes.post('/products', _ProductController2.default.create);
routes.put('/products/:id', _ProductController2.default.update);
routes.delete('/products/:id', _ProductController2.default.delete);

exports. default = routes;
