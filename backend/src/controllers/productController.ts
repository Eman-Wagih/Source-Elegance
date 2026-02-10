import { type Request, type Response } from "express";
import { createProduct } from "../services/productService.js";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productDescription, price, image, rating } = req.body;
    const seller = req.user?.id;
    console.log(req.user);
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
      sellerId: seller,
    });
    return res.status(201).json(product);
  } catch (err) {
    console.log("Error creating product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
