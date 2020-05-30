"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const Product = _mongoose.Schema.call(void 0, 
  {
    title: String,
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose.model.call(void 0, 'Product', Product);
