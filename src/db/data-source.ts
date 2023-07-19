import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Wishlist } from './entity/Wishlist';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'epic',
  password: '',
  database: 'epic',
  synchronize: false,
  logging: false,
  entities: [User, Product, Wishlist],
  migrations: ['src/db/migration/*.ts'],
  subscribers: [],
});
