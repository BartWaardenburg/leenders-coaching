import { createClient, type ClientConfig } from "next-sanity";

/* Configuration object for Sanity client */
export const config: ClientConfig = {
  projectId: "unh7vl3r",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    enabled: false,
  },
};

/* Create a client instance for fetching data */
export const client = createClient(config);
