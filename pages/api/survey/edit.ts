// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateSurvey, getSurvey } from "@/lib/mongoFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    // get data
    const result = await getSurvey(req.body.id);
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
    await updateSurvey(req.body.id, req.body.surveyData);
    res.status(200).send("successfully updated?");
  } else {
    res
      .status(405)
      .send("use a POST request at this endpoint to create a new survey.");
  }
}
