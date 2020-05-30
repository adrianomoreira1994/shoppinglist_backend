import Product from '../schemas/product.schema';

class ProductController {
  async index(req, res) {
    try {
      const response = await Product.find({});
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
      const response = await Product.create(req.body);
      return res.status(201).send(response);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const response = await Product.findOneAndUpdate(
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
      await Product.findOneAndDelete(req.params.id);
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default new ProductController();
