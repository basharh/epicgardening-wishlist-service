import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { Wishlist } from './entity/Wishlist';

const NODE_ENV = process.env.NODE_ENV;

const common = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Product, Wishlist],
  subscribers: [],
};

export const AppDataSource =
  NODE_ENV === 'production'
    ? new DataSource({
        type: 'postgres',
        ...common,
        synchronize: false,
        logging: false,
        migrations: ['build/db/migration/*.js'],
      })
    : new DataSource({
        type: 'postgres',
        ...common,
        synchronize: false,
        logging: false,
        migrations: ['src/db/migration/*.ts'],
      });
