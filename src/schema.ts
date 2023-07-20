import { AppDataSource as ds } from './db/data-source';
import { Wishlist } from './db/entity/Wishlist';
import {
  findOrCreateProduct,
  findProductByShopifyId,
} from './services/product';
import {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistWithProducts,
} from './services/wishlist';
import { DEFAULT_WISHLIST_ID } from './constants';

export const typeDefs = `#graphql
  type Product {
    id: ID!
    shopifyId: ID!
    wishlists: [Wishlist]
  }

  type Wishlist {
    id: ID!
    name: String!
    products: [Product]!
  }

  type Query {
    wishlist: Wishlist!
    wishlists: [Wishlist]!
  }

  type Mutation {
    addProductToWishlist(shopifyProductId: ID!, wishlistId: ID): Wishlist!
    removeProductFromWishlist(shopifyProductId: ID!, wishlistId: ID): Wishlist!
  }
`;

export const resolvers = {
  Query: {
    wishlist: () => getWishlistWithProducts(DEFAULT_WISHLIST_ID),
    wishlists: async () => {
      const wishlists = await ds.manager.find(Wishlist);
      return wishlists;
    },
  },
  Mutation: {
    addProductToWishlist: async (_, { shopifyProductId, wishlistId }) => {
      if (wishlistId == null) wishlistId = DEFAULT_WISHLIST_ID;

      const product = await findOrCreateProduct(shopifyProductId);

      const wishlist = await addProductToWishlist(wishlistId, product.id);

      return wishlist;
    },
    removeProductFromWishlist: async (_, { shopifyProductId, wishlistId }) => {
      if (wishlistId == null) wishlistId = DEFAULT_WISHLIST_ID;

      const product = await findProductByShopifyId(shopifyProductId);

      if (product == null) throw 'product not found';

      const wishlist = await removeProductFromWishlist(wishlistId, product.id);

      return wishlist;
    },
  },
};
