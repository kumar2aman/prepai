import express from "express";
import {createServer} from "http";
import cors from "cors";
import cookiesParser from "cookie-parser";
import { router } from "./routes/routes.js";
import { authRouter } from "./api/v1/auth/controller.js";
import { WebSocketServer } from "ws";
import { newConnection } from "./api/v1/ws.userAudio.js";



const app = express();

 const server = createServer(app);


export const wss = new WebSocketServer({ server,path:"/ws" });


wss.on("connection", newConnection);

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.raw({
    type: "audio/webm",
    limit: "50mb",
  })
);

app.use(cookiesParser());

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);





// run server
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
