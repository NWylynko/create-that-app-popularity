import * as functions from "firebase-functions";
import { z } from "zod"
import { initDatabase } from "./initDatabase"

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const list = functions.https.onRequest(async (request, response) => {

  const db = await initDatabase();

  const result = await db.list();

  // caching header
  response.setHeader("Cache-Control", "public, max-age=300, s-maxage=600");

  response.json(result ?? {})

})

const eventSchema = z.object({
  id: z.string(),
})

export const event = functions.https.onRequest(async (request, response) => {

  const { id } = await eventSchema.parseAsync(request.body)

  const { increment } = await initDatabase();

  await increment(id);

  response.json({ success: true, id })

})