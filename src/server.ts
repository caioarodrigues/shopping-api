import app from "./app";
import { defaultConfig } from "./config";

defaultConfig.db.connect();

app.listen(defaultConfig.port, () => {
  console.log(`Server is running on http://localhost:${defaultConfig.port}`);
});
