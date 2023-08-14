import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";
@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column("text")
  description: string;

  @Column()
  discountrate: number;

  @Column({ length: 255 })
  coverimage: string;

  @Column({ length: 100 })
  price: string;

  @Column()
  stock: number;

  @OneToMany(() => Order, (order) => order.book)
  orders: Order[];
}
