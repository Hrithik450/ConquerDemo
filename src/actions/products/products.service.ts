import { ProductsModel } from "./products.model";
import type { NewProduct, Product } from "./products.types";
import { slugify } from "@/lib/utils";

export class ProductsService {
  static async createProduct(data: NewProduct): Promise<Product> {
    // Generate slug from name if not provided
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if slug already exists
    const existingProduct = await ProductsModel.getProductBySlug(data.slug);
    if (existingProduct) {
      throw new Error("A product with this slug already exists");
    }

    return await ProductsModel.createProduct(data);
  }

  static async getProductById(productId: string): Promise<Product> {
    const product = await ProductsModel.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const product = await ProductsModel.getProductBySlug(slug);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  static async updateProduct(
    productId: string,
    data: Partial<NewProduct>
  ): Promise<Product> {
    // If name is being updated, update slug as well
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    // Check if new slug already exists
    if (data.slug) {
      const existingProduct = await ProductsModel.getProductBySlug(data.slug);
      if (existingProduct && existingProduct.productId !== productId) {
        throw new Error("A product with this slug already exists");
      }
    }

    const product = await ProductsModel.updateProduct(productId, data);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  static async deleteProduct(productId: string): Promise<void> {
    const success = await ProductsModel.deleteProduct(productId);
    if (!success) {
      throw new Error("Product not found");
    }
  }

  static async listProducts(activeOnly: boolean = false): Promise<Product[]> {
    return activeOnly
      ? await ProductsModel.listActiveProducts()
      : await ProductsModel.listProducts();
  }

  static async searchProducts(
    searchTerm: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    return activeOnly
      ? await ProductsModel.searchActiveProducts(searchTerm)
      : await ProductsModel.searchProducts(searchTerm);
  }

  static async getProductsByBrand(
    brandId: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    const products = await ProductsModel.getProductsByBrand(brandId);
    return activeOnly
      ? products.filter((product) => product.isActive)
      : products;
  }

  static async getProductsByCategory(
    categoryId: string,
    activeOnly: boolean = false
  ): Promise<Product[]> {
    const products = await ProductsModel.getProductsByCategory(categoryId);
    return activeOnly
      ? products.filter((product) => product.isActive)
      : products;
  }
}
