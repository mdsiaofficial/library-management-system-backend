import cors from "cors";
import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-nine-tau.vercel.app",
    ],
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System API is running!");
});

app.use((req: Request, res: Response) => {
  res.status(404).send("Route Not Found");
});

export default app;
