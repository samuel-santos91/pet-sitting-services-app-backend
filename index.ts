import express, { Express } from "express";
import cors from "cors";

import authRoutes from "./routes/authentication";
import customerPage from "./routes/customer_page";
import customerRequestPage from "./routes/customer_request_page";
import sitterRequestPage from "./routes/sitter_request_page";

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
