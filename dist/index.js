"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
// import { Server } from "socket.io";
// import { createServer } from "http";
const app = (0, express_1.default)();
const port = process.env.PORT;
// const server = createServer(app);
// const io = new Server(server);
dotenv_1.default.config();
app.use(express_1.default.json());
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log(`Server running in port : ${port}`);
});
