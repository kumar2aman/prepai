import express from "express";

import cors from "cors";
import cookiesParser from "cookie-parser";
import { router } from "./routes/routes.js";
import { authRouter } from "./api/v1/auth/controller.js";

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(cookiesParser());

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);

// run server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
