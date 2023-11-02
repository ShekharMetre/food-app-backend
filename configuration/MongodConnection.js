import mongoose from "mongoose";

const MongodConnection = async () => {
  const data = await mongoose.connect(
    process.env.MONGODBCONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return data;
};

export default MongodConnection