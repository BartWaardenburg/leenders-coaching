import { GraphQLClient } from "graphql-request";

if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
  throw new Error("NEXT_PUBLIC_SANITY_API_TOKEN is required");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "unh7vl3r";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = new GraphQLClient(
  `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
    },
  },
);
