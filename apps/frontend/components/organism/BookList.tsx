import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Card from "../atoms/Card";
import BookCard from "../molecules/BookCard";
import RefreshControl from "../atoms/RefreshControl";
import { Book } from "../../models/Book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<Book[]>(
        `http://localhost:3000/api/books?page=${page}`
      );

      if (response.data.length === 0) {
        setHasMoreData(false);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...response.data]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const handleRefresh = useCallback(() => {
    setBooks([]);
    setHasMoreData(true);
    setPage(1);
    fetchData(1);
  }, [fetchData]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMoreData) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMoreData]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "80% 0px 0px 0px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (lastBookRef.current) {
      observer.current.observe(lastBookRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div className="book-list">
      <Card>
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookRef} key={book.id}>
                <BookCard
                  id={book.id}
                  title={book.title}
                  description={book.description}
                  discountrate={book.discountrate}
                  coverimage={book.coverimage}
                  price={book.price}
                />
              </div>
            );
          } else {
            return (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                description={book.description}
                discountrate={book.discountrate}
                coverimage={book.coverimage}
                price={book.price}
              />
            );
          }
        })}
        {isLoading && <p>Loading...</p>}
        <RefreshControl onRefresh={handleRefresh} />
      </Card>
    </div>
  );
};

export default BookList;
