import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";

dotenv.config();

const app = express();

app.use("/students", studentRoutes);

app.use(
  express.json({
    limit: "20mb",
    extended: "true",
  })
);

app.use(
  express.urlencoded({
    limit: "20mb",
    extended: "true",
  })
);

app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Connection is established and running on port: ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
