// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

type Data = {
  name: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit api endpoint /hello");
  
  if (surveys) {
    res.status(200).json(surveys);
  }
}
