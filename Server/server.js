import app from "./app.js";
import "dotenv/config";
import { connectDatabase } from "./Config/mongodb.config.js";

connectDatabase();

// Only listen locally, Vercel handles it in production
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

export default app;
