import { AppDataSource as ds } from '../db/data-source';
import { Product } from '../db/entity/Product';

export async function findOrCreateProduct(
  shopifyProductId: string,
): Promise<Product> {
  let product = await ds.manager.findOneBy(Product, {
    shopifyId: shopifyProductId,
  });

  if (product == null) {
    product = ds.manager.create(Product, {
      shopifyId: shopifyProductId,
    });

    return await ds.manager.save(product);
  }

  return product;
}

export async function findProductByShopifyId(
  shopifyProductId: string,
): Promise<Product | null> {
  const product = await ds.manager.findOneBy(Product, {
    shopifyId: shopifyProductId,
  });

  return product;
}
