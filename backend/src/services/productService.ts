import type { DeepPartial } from "typeorm";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
import type { Product as productType } from "../interfaces/Product.js";

export const createProduct = async (data: productType) => {
  const repo = AppDataSource.getRepository(Product);
  const product = repo.create(data as DeepPartial<Product>);
  await repo.save(product);

  return product;
};

export const editProduct = async (data: Partial<productType>) => {
  if (!data.id) {
    throw new Error("Product ID is required");
  }
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOne({
    where: { id: data.id },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  repo.merge(product, data as DeepPartial<Product>);

  await repo.save(product);
  return product;
};
