"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _productschema = require('../schemas/product.schema'); var _productschema2 = _interopRequireDefault(_productschema);

class ProductController {
  async index(req, res) {
    try {
      const response = await _productschema2.default.find({});
      const products = response.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        price: product.price,
      }));
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    try {
      const response = await _productschema2.default.create(req.body);
      return res.status(201).send(response);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const response = await _productschema2.default.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { return: false }
      );

      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      await _productschema2.default.findOneAndDelete(req.params.id);
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

exports. default = new ProductController();
