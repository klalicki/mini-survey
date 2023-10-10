import { SurveyDataset } from "@/types/SectionTypes";
import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);
const coll = client.db("prod").collection("surveys");

export async function createNewSurvey() {
  try {
    const item = coll.insertOne({ sections: [] });
    // const result = await cursor.toArray();
    return (await item).insertedId;
  } catch (error) {
    // console.log(error);
  } finally {
  }
}

export function getSurvey(id: string) {
  try {
    const surveyData = coll.findOne({ _id: new ObjectId(id) });
    return surveyData;
  } catch (error) {}
}
export async function updateSurvey(id: string, newData: SurveyDataset) {
  try {
    console.log("update");
    const res = await coll.replaceOne({ _id: new ObjectId(id) }, newData);
    console.log(res);
    //  const surveyData = coll.findOne({ _id: new ObjectId(id) });
    //  return surveyData;
  } catch (error) {}
}

/* 
async function getFromAPI(id: string) {
  try {
    const coll = client.db("prod").collection("surveys");
    const cursor = coll.find({ _id: new ObjectId(id) });
    const result = await cursor.toArray();
    return result;
  } catch (error) {
    // console.log(error);
  } finally {
  }
}
async function createNewSurvey() {
    try {
      const coll = client.db("prod").collection("surveys");
      coll.insertOne()
      const cursor = coll.find({ _id: new ObjectId(id) });
      const result = await cursor.toArray();
      return result;
    } catch (error) {
      // console.log(error);
    } finally {
    }
}
 */
