import express from "express";
import 'dotenv/config';
import cors from "cors";
import cookiesParser from "cookie-parser";
import { router } from "./routes/routes.js";
import { authRouter } from "./api/v1/auth/controller.js";
import passport from "./lib/passport.js";
const app = express();



app.enable("trust proxy");

// middleware
const allowedOrigins = [
 process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));

app.use(cookiesParser());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello from the PrepAI backend!");
})

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Express global error handler caught:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || String(err),
  });
});

// run server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
