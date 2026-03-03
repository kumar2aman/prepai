import express from "express";
import 'dotenv/config';
import cors from "cors";
import cookiesParser from "cookie-parser";
import { router } from "./routes/routes.js";
import { authRouter } from "./api/v1/auth/controller.js";

const app = express();

app.set("trust proxy", 1); // trust first proxy

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.com", // add deployed frontend later
];

// middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(cookiesParser());

app.get("/", (req, res) => {
  res.send("Hello from the PrepAI backend!");
})

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);

// run server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
