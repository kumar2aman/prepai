import express from "express";

import cors from "cors";
import { router } from "./routes/routes.js";
import { authRouter } from "./api/v1/auth/controller.js";

const app = express();

app.use(
  express.raw({
    type: "audio/webm",
    limit: "50mb", // Adjust this limit as needed
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1", router);

app.use("/api/v1/auth", authRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
