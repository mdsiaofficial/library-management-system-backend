import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const DB_User = "libraryDB";
const DB_Password = "libraryDB";

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_User}:${DB_Password}@cluster0.2ev6cf0.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0`
    );
    // Start the server
    server = app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
    // console.log(server);
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
