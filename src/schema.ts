import { AppDataSource } from './db/data-source';
import { Wishlist } from './db/entity/Wishlist';

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
`;

export const resolvers = {
  Query: {
    wishlists: async () => {
      const wishlists = await AppDataSource.manager.find(Wishlist);
      return wishlists;
    },
  },
};
