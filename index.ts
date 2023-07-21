import express, { Express } from "express";
import cors from "cors";

import authRoutes from "./routes/authentication";
import customerPage from "./routes/customer_page";
import customerRequestPage from "./routes/customer_request_page";
import sitterRequestPage from "./routes/sitter_request_page";

const app: Express = express();

app.use(
  cors({
    origin:
      "https://64b8f1b9900f0661a42c3cb3--clinquant-frangollo-bba5e1.netlify.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.options("/log-in", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://64b8f1b9900f0661a42c3cb3--clinquant-frangollo-bba5e1.netlify.app");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Allow-Credentials", "true");
  res.send();
});
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
