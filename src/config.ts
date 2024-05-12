import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const defaultConfig = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || "secret",
  db: {
    host: process.env.DB_HOST || "localhost",
    connection_string: process.env.CONNECTION_STRING || "",
    user: "",
    password: "",
    connect: async () => {
      try {
        if (defaultConfig.db.connection_string) {
          await mongoose
            .connect(defaultConfig.db.connection_string)
            .then(() => console.log("Connected to database"))
            .catch((error) =>
              console.error(
                `Erro while trying to connect to database: ${error}`
              )
            );

          return mongoose.connection;
        }
      } catch (error) {
        console.error(`Error while trying to connect to database: ${error}`);
      }
    },
  },
};
