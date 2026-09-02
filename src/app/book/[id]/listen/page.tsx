"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBooks } from "@/context/book-context";
import { useAudio } from "@/context/audio-context";
import { FullScreenPlayer } from "@/components/player/full-screen-player";

export default function BookListenPage() {
  const params = useParams();
  const bookId = params.id as string;
  const { books, setActiveBookId } = useBooks();
  const { currentBook, playBook } = useAudio();

  const targetBook = books.find((b) => b.id === bookId) || books[0];

  useEffect(() => {
    if (targetBook) {
      setActiveBookId(targetBook.id);
      playBook(targetBook);
    }
  }, [bookId]);

  return <FullScreenPlayer />;
}
