import express, { Express } from "express";
import cors, { CorsOptions } from "cors";

import authRoutes from "./routes/authentication";
import customerPage from "./routes/customer_page";
import customerRequestPage from "./routes/customer_request_page";
import sitterRequestPage from "./routes/sitter_request_page";

interface CustomCorsOptions extends CorsOptions {
  headers?: string[];
}

const app: Express = express();

const corsOptions: CustomCorsOptions = {
  origin: [
    "https://pet-sitting-service-app.netlify.app",
    "http://localhost:5173",
  ],
  methods: ["POST", "GET"],
  credentials: true,
  headers: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

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
