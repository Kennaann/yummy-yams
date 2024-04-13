import app from "./app";
import mongoose from "mongoose";
import ConfigService from "./services/config.service";

const init = async () => {
  try {
    const port = ConfigService.get("PORT");
    const uri = ConfigService.get("MONGODB_URI");

    await mongoose.connect(uri);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("index.ts : ", error);
    process.exit(1);
  }
};

init();
