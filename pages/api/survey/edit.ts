// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateSurvey, getSurvey } from "@/lib/mongoFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    console.log(req.query.id);
    if (!req.query.id) {
      res.status(404).send("invalid query");
    }
    const result = await getSurvey(req.query.id as string);

    if (result.status === "success") {
      res.status(200).send(result?.data?.sections);
    } else {
      res.status(404).send("entry not found!");
    }
    // handler for PUT method (updating database)
  } else if (req.method === "PUT") {
    if (!req.query.id) {
      res.status(404).send("invalid query");
    }
    await updateSurvey(req.query.id as string, {
      sections: req.body.surveyData,
    });
    res.status(200).send("successfully updated?");
  } else {
    res
      .status(405)
      .send("use a POST request at this endpoint to create a new survey.");
  }
}
