# 📚 Library Management System (Express + TypeScript + Mongoose)

A simple and powerful library management system built using **Express**, **TypeScript**, and **MongoDB** via **Mongoose**. This system handles books and borrowing logic and uses MongoDB aggregation for summaries.

---

## 🚀 Features

- 📖 Book management with full validation
- 🔐 Borrowing logic with availability control
- 📊 Borrowed books summary via MongoDB Aggregation Pipeline
- 🧠 Mongoose static methods and middleware (`pre`, `post`)
- 🔍 Query filtering via query params
- 📦 RESTful API design
- 💡 Built with TypeScript for type safety

---

---


### Install dependencies

```
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## 📚 Book API

#### 🔸 Create a Book

For creating a book use this api

```
method: POST
API: http://localhost:5000/books
```

Request Body:

```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### 🔹 Get All Books

For getting all books aslo filer and sorting can be possible

```
method: GET
API: http://localhost:5000/books

For filtering:

http://localhost:5000/books?filter=SCIENCE&sortBy=title&sort=asc&limit=10

```

#### 🔍 Get Single Book by ID

```
method: GET
API: http://localhost:5000/books/:bookId

```

#### 📝 Update Book

```
method: PATCH
API: http://localhost:5000/books/:bookId


```

Request Body: (Partial or full fields to update)

```
{
  "copies": 10,
  "available": true
}

```

#### ❌ Delete Book

```
method: DELETE
API: http://localhost:5000/books/:bookId


```

## 📥 Borrow API

#### 🔸 Borrow a Book

```
method: POST
API: http://localhost:5000/borrow
```

Reques Body:

```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 📊 Borrow Summary (Aggregation)

here use aggregation for generate a Repository

```
method: GET
API: http://localhost:5000/borrow

```
