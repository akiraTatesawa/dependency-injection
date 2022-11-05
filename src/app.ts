import "dotenv/config";
import "reflect-metadata";
import { App } from "./config/application";

export async function Bootstrap() {
  const app = new App();
  await app.init();

  return app;
}

Bootstrap();
