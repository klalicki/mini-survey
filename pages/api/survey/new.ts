// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createNewSurvey } from "@/lib/mongoFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // console.log(req);
  if (req.method === "POST") {
    const result = await createNewSurvey();

    if (result.status === "success") {
      res.status(200).json({ id: result.id });
    } else {
      // error from API
      res.status(502).send("encountered an error creating a new document");
    }
  } else {
    res
      .status(405)
      .send("use a POST request at this endpoint to create a new survey.");
  }
}
