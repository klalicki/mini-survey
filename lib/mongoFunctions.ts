import { SurveyDataset } from "@/types/SectionTypes";
import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.NODE_ENV === "development" ? "dev" : "prod";
console.log(`connecting to ${dbName} database.`);
const client = new MongoClient(uri, { socketTimeoutMS: 10000 });
const coll = client.db(dbName).collection("surveys");

export async function createNewSurvey(): Promise<{
  status: string;
  id: ObjectId | null;
}> {
  try {
    const item = await coll.insertOne({
      sections: [],
      timeLastEdited: Date.now(),
    });

    return { status: "success", id: item.insertedId };
  } catch (error) {
    return { status: "error: " + error, id: null };
  } finally {
  }
}

export async function getSurvey(id: string): Promise<{
  status: string;
  data: { sections: [] };
}> {
  try {
    const surveyData = await coll.findOne({ _id: new ObjectId(id) });
    console.log("surveyData in get:");
    console.log(surveyData);
    if (surveyData === null) {
      return { status: "success", data: { sections: [] } };
    } else return { status: "success", data: surveyData };
  } catch (error) {
    return { status: "error: " + error, data: {} };
  }
}
export async function updateSurvey(
  id: string,
  newData: SurveyDataset
): Promise<{ status: string }> {
  try {
    console.log("update");
    const res = await coll.replaceOne(
      { _id: new ObjectId(id) },
      { ...newData, timeLastEdited: Date.now() }
    );
    console.log(res);
    return { status: "success" };
  } catch (error) {
    return { status: "error: " + error };
  }
}

export async function cleanUp(): Promise<{
  status: string;
  deleteCount: number;
}> {
  try {
    console.clear();
    console.log("removing all items with old dates");
    const dateCutoff = new Date().setHours(new Date().getHours() - 24);
    const query = {
      timeLastEdited: { $lt: dateCutoff },
    };
    const result = await coll.deleteMany(query);
    console.log(`Deleted ${result.deletedCount} documents.`);
    return { status: "success", deleteCount: result.deletedCount };
  } catch (error) {
    return { status: "error: " + error, deleteCount: 0 };
  }
}

export async function getDocCount(): Promise<{
  status: string;
  count: number;
}> {
  try {
    const docCount = await coll.countDocuments();
    return { status: "success", count: docCount };
  } catch (error) {
    return { status: "error", count: 0 };
  }
}
