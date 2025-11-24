import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { BorrowBook } from "../models/borrow.model";
export const borrowRoutes = express.Router();

// get all borrow records
borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summaryData = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrow records retrieved successfully",
      data: summaryData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
});

// borrow books
borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    //Update the book stock
    await Book.borrowCopies(book, quantity);

    //Save borrow record
    const borrowRecord = await BorrowBook.create({ book, quantity, dueDate });
    // const book
    res.status(201).json({
      success: true,
      message: "Borrow records retrieved successfully",
      data: borrowRecord,
    });
  } catch (error) {
    const err: any = error as Error;
    res.status(err.statusCode || 500).json({
      message: "Validation failed",
      success: false,
      error: err.message,
    });
  }
});
