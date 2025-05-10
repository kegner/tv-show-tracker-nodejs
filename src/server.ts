import dotenv from "dotenv";
import Knex from "knex";
import { development } from "./knexfile.js";
import { Model } from "objection";
import express, { json } from "express";
import flash from "express-flash";
import cors from "cors";
import history from "connect-history-api-fallback";
import { resolve } from "path";
import path from "path";
import { fileURLToPath } from "url";
import shows from "./routes/show-routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Objection and Knex
const knex = Knex(development);
Model.knex(knex);

// Express
const app = express();
const port = process.env.PORT || 5000;

// JSON
app.use(json());
app.set("json spaces", 2);

// Messages
app.use(flash());

// Cors
const corsOptions = {
  origin: process.env.LOCAL_CLIENT_URL,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/shows", shows);

// History fallback
app.use(history());

// Path setup
app.use(express.static("client/dist"));
app.get("*", (_req, res) =>
  res.sendFile(resolve(__dirname, "client/dist", "index.html"))
);

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("SIGINT", () => process.exit(0));
