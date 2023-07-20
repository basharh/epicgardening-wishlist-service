import { AppDataSource as ds } from '../db/data-source';
import { Product } from '../db/entity/Product';

export async function findOrCreateProduct(id): Promise<Product> {
  let product = await ds.manager.findOneBy(Product, { id });

  if (product == null) {
    product = ds.manager.create(Product, {
      id,
    });

    return await ds.manager.save(product);
  }

  return product;
}
