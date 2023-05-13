import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contacts.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);

/* MONGOOSE SETUP */
const PORT = 3001 || 6001;
mongoose
  .connect(
    "mongodb+srv://karimzaki:Qp_J4QDmf!xWz2V@cluster0.u7j5nmc.mongodb.net/contacts?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
