"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBooks } from "@/context/book-context";
import { BookReaderView } from "@/components/reader/book-reader-view";

export default function BookReadPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { books, setActiveBookId } = useBooks();

  const targetBook = books.find((b) => b.id === bookId) || books[0];

  useEffect(() => {
    if (targetBook) {
      setActiveBookId(targetBook.id);
    }
  }, [bookId]);

  if (!targetBook) return null;

  return <BookReaderView book={targetBook} />;
}
