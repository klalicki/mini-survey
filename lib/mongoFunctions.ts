import { SurveyDataset } from "@/types/SectionTypes";
import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, { socketTimeoutMS: 10000 });
const coll = client.db("prod").collection("surveys");

export async function createNewSurvey() {
  try {
    const item = await coll.insertOne({
      sections: [],
      timeLastEdited: Date.now(),
    });
    // const result = await cursor.toArray();
    // client.close();
    return item.insertedId;
  } catch (error) {
    // console.log(error);
  } finally {
  }
}

export async function getSurvey(id: string) {
  try {
    const surveyData = await coll.findOne({ _id: new ObjectId(id) });
    // client.close();
    return surveyData;
  } catch (error) {}
}
export async function updateSurvey(id: string, newData: SurveyDataset) {
  try {
    console.log("update");
    const res = await coll.replaceOne(
      { _id: new ObjectId(id) },
      { ...newData, timeLastEdited: Date.now() }
    );
    // client.close();
    console.log(res);
    //  const surveyData = coll.findOne({ _id: new ObjectId(id) });
    //  return surveyData;
  } catch (error) {}
}

export async function cleanUp() {
  try {
    console.clear();
    console.log("cleaning up entries with no entries");
    const a = await coll.deleteMany({ sections: null });
    console.log(a);
    return a;
  } catch (error) {
    console.log(error);
  }
}
