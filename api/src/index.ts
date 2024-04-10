import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

if (!port || !uri) {
  console.error("Missing environment variables");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to the database \n", error);
  });
