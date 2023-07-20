import { AppDataSource as ds } from './db/data-source';
import { Wishlist } from './db/entity/Wishlist';
import { findOrCreateProduct } from './services/product';
import { addProductToWishlist } from './services/wishlist';
import { DEFAULT_WISHLIST_ID } from './constants';

export const typeDefs = `#graphql
  type Product {
    id: String
    wishlists: [Wishlist]
  }

  type Wishlist {
    name: String
    products: [Product]
  }

  type Query {
    wishlists: [Wishlist]
  }

  type Mutation {
    addProductToWishList(productId: String!, wishlistId: String): Wishlist
  }
`;

export const resolvers = {
  Query: {
    wishlists: async () => {
      const wishlists = await ds.manager.find(Wishlist);
      return wishlists;
    },
  },
  Mutation: {
    addProductToWishList: async (_, { productId, wishlistId }) => {
      if (wishlistId == null) wishlistId = DEFAULT_WISHLIST_ID;

      const product = await findOrCreateProduct(productId);

      const wishlist = await addProductToWishlist(wishlistId, product.id);

      return wishlist;
    },
  },
};
