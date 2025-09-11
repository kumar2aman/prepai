import express from "express";

import cors from "cors";
import { router } from "./routes/routes.js";

const app = express();

app.use(
  express.raw({
    type: "audio/webm",
    limit: "50mb", // Adjust this limit as needed
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api", router);




app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
