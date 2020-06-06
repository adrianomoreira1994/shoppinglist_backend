import { Request, Response } from 'express';
import formatNumber from '../util/format';
import Product from '../schemas/ProductSchema';

class ProductController {
  async index(request: Request, response: Response) {
    try {
      const productResponse = await Product.find({ user_id: request.userId });
      const products = productResponse.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        price: formatNumber(product.price),
        subTotal: formatNumber(product.price * product.quantity),
      }));

      return response.status(200).send(products);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { title, quantity, price } = request.body;

      if (!!request.userId == false) {
        return response.status(400).send("You haven't permission");
      }

      const createdProduct = await Product.create({
        title,
        quantity,
        price,
        user_id: request.userId,
      });

      return response.status(201).send(createdProduct);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const product = await Product.findOneAndUpdate(
        { _id: id, user_id: request.userId },
        request.body
      );

      return response.status(200).send(product);
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await Product.findOneAndDelete({ _id: id, user_id: request.userId });

      return response.json();
    } catch (error) {
      return response.status(500).send(error.message);
    }
  }
}

export default ProductController;
