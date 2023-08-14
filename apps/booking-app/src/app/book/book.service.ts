import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { Order } from "./entities/order.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Order) // Add this line
    private orderRepository: Repository<Order>
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async buyBook(bookId: number, quantity: number): Promise<Book | string> {
    const now = new Date();

    // Find the book by ID
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException("There is no book with this ID");
    }

    // Check if there is enough stock
    if (book.stock >= quantity) {
      book.stock -= quantity;

      // Create a new order
      const order = this.orderRepository.create({
        book,
        quantity,
        createdAt: now,
      });

      // Save changes to book and order
      await this.bookRepository.save(book);
      await this.orderRepository.save(order);

      return book;
    } else {
      throw new Error("Not enough stock");
    }
  }
  // async buyBook(bookId: number, quantity: number) {
  //   const now = new Date();
  //   const book = await this.bookRepository.findOne({ where: { id: bookId } });
  //   if (!book) {
  //     return "there is not book with this id";
  //   }

  //   if (book.stock >= quantity) {
  //     book.stock -= quantity;
  //     const order = await this.orderRepository.create({
  //       book: book,
  //       quantity: quantity,
  //       createdAt: now,
  //     });

  //     await this.bookRepository.save(book);
  //     await this.orderRepository.save(order);
  //   } else {
  //     throw new Error("Not enough stock");
  //   }
  //   return book;
  // }
}
