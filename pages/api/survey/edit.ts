// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateSurvey, getSurvey } from "@/lib/mongoFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    console.log(req.query.id);
    // get data
    if (!req.query.id) {
      res.status(404).send("invalid query");
    }
    const result = await getSurvey(req.query.id as string);
    // console.log(req.body);
    // console.log(req.method);
    // console.log(result);
    if (!result) {
      res.status(404).send("entry not found!");
    } else {
      res.status(200).send(result.sections);
    }

    // if (result) {
    //   res.status(200).json({ id: result });
    // }
  } else if (req.method === "PUT") {
    console.log("put mothed");
    console.log(req.body);
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
