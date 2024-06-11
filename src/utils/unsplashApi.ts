import { createApi } from "unsplash-js";

if (!process.env.UNSPLASH_ACCESS_KEY) {
  throw new Error(`env var "UNSPLASH_ACCESS_KEY" is not set!`);
}

// TODO: setup a proxy so the access key is not exposed on the frontend
export const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});
