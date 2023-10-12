// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cleanUp } from "@/lib/mongoFunctions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const a = await cleanUp();
  res.send(a);
}
