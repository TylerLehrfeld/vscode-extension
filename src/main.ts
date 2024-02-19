import mongoose from "mongoose";
import{ ConnectOptions } from "mongoose";
import MONGO_CONNECTION_STRING from "./Env";


//const URL = process.env.MONGO_CONNECTION_STRING as string;
const URL = MONGO_CONNECTION_STRING;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export function connect() {
  mongoose.connect(URL, options as ConnectOptions);
  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB");
    console.log(err);
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB!");
  });
}


