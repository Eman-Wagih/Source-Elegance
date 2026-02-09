import { type Request, type Response } from "express";
import { createProduct } from "../services/productService.js";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productDescription, price, image, rating, seller } =
      req.body;
    if (!productName || !price || !image) {
      return res
        .status(400)
        .json({ message: "please fill out the required fields" });
    }
    const product = await createProduct({
      productName,
      productDescription,
      price,
      image,
      rating,
      seller,
    });
    return res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
