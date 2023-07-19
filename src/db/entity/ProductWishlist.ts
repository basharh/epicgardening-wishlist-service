import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Wishlist } from './Wishlist';

@Entity()
export class ProductWishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.productWishlists)
  wishlist: Wishlist;
}
