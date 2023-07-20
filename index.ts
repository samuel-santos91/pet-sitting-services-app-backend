import express, { Express } from "express";
import cors from "cors";

import authRoutes from "./routes/authentication";
import customerPage from "./routes/customer_page";
import customerRequestPage from "./routes/customer_request_page";
import sitterRequestPage from "./routes/sitter_request_page";

const app: Express = express();

const allowedOrigins = [
  "https://64b8f1b9900f0661a42c3cb3--clinquant-frangollo-bba5e1.netlify.app",
  "http://127.0.0.1:5173",
  // Add more allowed origins if needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request's origin is in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(express.json());

app.use(authRoutes);
app.use(customerPage);
app.use(customerRequestPage);
app.use(sitterRequestPage);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running");
});
