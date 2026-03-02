import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "dwb2jbf5",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
})