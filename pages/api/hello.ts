// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  name: string;
};
async function getFromAPI() {
  const uri = process.env.MONGODB_URI || "";

  const client = new MongoClient(uri);
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  } finally {
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit api endpoint /hello");
  await getFromAPI();
  // res.status(200).json({ name: "John Doe" });
}
