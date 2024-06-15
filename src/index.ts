import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
// import { Server } from "socket.io";
// import { createServer } from "http";

const app = express();
const port = process.env.PORT;
// const server = createServer(app);
// const io = new Server(server);

dotenv.config();
app.use(express.json());

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

routes(app);

app.listen(port, () => {
  console.log(`Server running in port : ${port}`);
});
