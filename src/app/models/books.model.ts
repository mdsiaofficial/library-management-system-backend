import { model, Schema, Types } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "{VALUE} is not a valid genre. Please select from the available genres.",
      },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, default: "", trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Static method to handle copy deduction
bookSchema.statics.borrowCopies = async function (
  bookId: Types.ObjectId,
  quantity: number
) {
  if (!Types.ObjectId.isValid(bookId)) {
    const err: any = new Error("Invalid book ID");
    err.statusCode = 400;
    throw err;
  }
  const book = await this.findById(bookId);
  if (!book) {
    console.log("Book not found");
    const err: any = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }

  if (book.copies < quantity) {
    const err: any = new Error("Not enough copies available");
    err.statusCode = 400;
    throw err;
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

bookSchema.post("findOneAndUpdate", async function (doc) {
  if (doc && doc.copies === 0 && doc.available !== false) {
    doc.available = false;
    await doc.save();
  }
  if (doc && doc.copies > 0 && doc.available !== true) {
    doc.available = true;
    await doc.save();
  }
});

export const Book = model<IBook, any>("Book", bookSchema);
