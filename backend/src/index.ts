import "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./data-source.js";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: any) => {
    // Print full error
    console.error(
      "Error during DataSource initialization:",
      err instanceof Error ? err.stack : err
    );
    process.exit(1); // terminate process if DB fails
  });
