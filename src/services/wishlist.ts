import { AppDataSource as ds } from '../db/data-source';
import { Product } from '../db/entity/Product';
import { Wishlist } from '../db/entity/Wishlist';

export async function getWishlistWithProducts(wishlistId) {
  return await ds.manager.findOne(Wishlist, {
    where: {
      id: wishlistId,
    },
    relations: {
      products: true,
    },
  });
}

export async function addProductToWishlist(
  wishlistId: string,
  productId: string,
) {
  const wishlist = await getWishlistWithProducts(wishlistId);
  const product = await ds.manager.findOneBy(Product, { id: productId });

  if (product == null || wishlist == null) {
    throw 'missing wishlist or product';
  }

  wishlist.products.push(product);

  await ds.manager.save(wishlist);

  return await getWishlistWithProducts(wishlistId);
}

export async function removeProductFromWishlist(
  wishlistId: string,
  productId: string,
) {
  const wishlist = await getWishlistWithProducts(wishlistId);

  if (wishlist == null) {
    throw 'missing wishlist or product';
  }

  wishlist.products = wishlist.products.filter(
    (product) => product.id != productId,
  );

  await ds.manager.save(wishlist);

  return await getWishlistWithProducts(wishlistId);
}
