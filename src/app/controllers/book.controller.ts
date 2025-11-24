import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
export const bookRoutes = express.Router();

// get all books with optional filters, sorting, limiting
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const limitValue = parseInt(limit as string) || 100;

    const filterObj: any = {};
    if (filter) {
      filterObj.genre = filter;
    }

    const sortOrder = sort === "asc" ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortBy as string] = sortOrder;

    // console.log(sortObj, filterObj);

    const books = await Book.find(filterObj).sort(sortObj).limit(limitValue);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

// get a book by id
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const books = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    const err = error as any;
    res.status(err.statusCode || 500).json({
      message: "Internal server error",
      error: err.message || error,
    });
  }
});

// delete a book by id
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    let book: any = await Book.findByIdAndDelete(bookId);

    book = book ? book : null;

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
});

// update a book by id
bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

// create a new book
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);
    console.log("", book);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
