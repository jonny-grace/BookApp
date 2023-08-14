import { Controller, Get, Param, Post } from "@nestjs/common";
import { BookService } from "./book.service";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    return books;
  }
  @Post(":bookId/buy/:quantity")
  async buyBook(
    @Param("bookId") bookId: number,
    @Param("quantity") quantity: number
  ) {
    try {
      const book = await this.bookService.buyBook(bookId, quantity);
      return book;
    } catch (error) {
      return { error: error.message };
    }
  }
}
