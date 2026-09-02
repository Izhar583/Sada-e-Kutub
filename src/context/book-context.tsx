"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Book, Bookmark } from "@/types/book";
import { SAMPLE_BOOKS } from "@/lib/mock-data";

interface BookContextType {
  books: Book[];
  activeBook: Book | null;
  setActiveBookId: (id: string) => void;
  addBook: (book: Book) => void;
  updateBookProgress: (bookId: string, chapterId: string, positionSeconds: number) => void;
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void;
  deleteBookmark: (bookId: string, bookmarkId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenreFilter: string;
  setSelectedGenreFilter: (g: string) => void;
  pendingUploadFile: File | null;
  setPendingUploadFile: (file: File | null) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(SAMPLE_BOOKS);
  const [activeBookId, setActiveBookIdState] = useState<string>("peer-e-kamil");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>("all");
  const [pendingUploadFile, setPendingUploadFile] = useState<File | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("readora_books");
    if (saved) {
      try {
        setBooks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved books", e);
      }
    }
  }, []);

  const saveBooks = (updated: Book[]) => {
    setBooks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("readora_books", JSON.stringify(updated));
    }
  };

  const addBook = (newBook: Book) => {
    const updated = [newBook, ...books];
    saveBooks(updated);
    setActiveBookIdState(newBook.id);
  };

  const updateBookProgress = (bookId: string, chapterId: string, positionSeconds: number) => {
    const updated = books.map((b) => {
      if (b.id === bookId) {
        const activeCh = b.chapters.find((c) => c.id === chapterId);
        const chDuration = activeCh?.durationSeconds || 1000;
        const calcPercent = Math.min(100, Math.round((positionSeconds / chDuration) * 100));
        return {
          ...b,
          currentChapterId: chapterId,
          currentPositionSeconds: positionSeconds,
          progressPercent: calcPercent,
        };
      }
      return b;
    });
    saveBooks(updated);
  };

  const addBookmark = (bm: Omit<Bookmark, "id" | "createdAt">) => {
    const newBookmark: Bookmark = {
      ...bm,
      id: `bm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = books.map((b) => {
      if (b.id === bm.bookId) {
        return {
          ...b,
          bookmarks: [newBookmark, ...(b.bookmarks || [])],
        };
      }
      return b;
    });
    saveBooks(updated);
  };

  const deleteBookmark = (bookId: string, bookmarkId: string) => {
    const updated = books.map((b) => {
      if (b.id === bookId) {
        return {
          ...b,
          bookmarks: b.bookmarks.filter((bm) => bm.id !== bookmarkId),
        };
      }
      return b;
    });
    saveBooks(updated);
  };

  const activeBook = books.find((b) => b.id === activeBookId) || books[0] || null;

  return (
    <BookContext.Provider
      value={{
        books,
        activeBook,
        setActiveBookId: setActiveBookIdState,
        addBook,
        updateBookProgress,
        addBookmark,
        deleteBookmark,
        searchQuery,
        setSearchQuery,
        selectedGenreFilter,
        setSelectedGenreFilter,
        pendingUploadFile,
        setPendingUploadFile,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("useBooks must be used within a BookProvider");
  return context;
};
