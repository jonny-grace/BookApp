import {
  NestModule,
  Module,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookModule } from "./book/book.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./book/entities/book.entity";
import { Order } from "./book/entities/order.entity";

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: `localhost`,
      port: 5432,
      username: `postgres`,
      password: `none`,
      database: `BookList`,
      entities: [Book, Order],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
