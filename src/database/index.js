import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDb = async () => {
  const connectionUrl =
    "mongodb+srv://nehalpradhan23:nehalpradhan23@cluster0.bffhnjt.mongodb.net/";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully"))
    .catch((err) => console.log(`Error from DB: ${err.message}`));
};

export default connectToDb;
