import { ObjectId } from "mongodb";
import { IJobTag, DEFAULT_JOB_TAG_VALS } from "@src/models/JobTag";
import { getDb } from "@src/common/util/mongo";

export default class JobTagService {
  static async createJobTag(data: Partial<IJobTag>): Promise<IJobTag> {
    const tag: IJobTag = {
      ...DEFAULT_JOB_TAG_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db.collection<IJobTag>("job_tags").insertOne(tag);
    return { ...tag, _id: result.insertedId };
  }

  static async getAllJobTags(
    filter: Partial<IJobTag> = {}
  ): Promise<IJobTag[]> {
    const db = await getDb();
    // Allow filtering by tag_name and tag_type
    const query: any = {};
    if (filter.tag_name)
      query.tag_name = { $regex: filter.tag_name, $options: "i" };
    if (filter.tag_type)
      query.tag_type = { $regex: filter.tag_type, $options: "i" };
    return db.collection<IJobTag>("job_tags").find(query).toArray();
  }

  static async getJobTagById(id: ObjectId): Promise<IJobTag | null> {
    const db = await getDb();
    return db.collection<IJobTag>("job_tags").findOne({ _id: id });
  }

  static async updateJobTag(
    id: ObjectId,
    data: Partial<IJobTag>
  ): Promise<IJobTag | null> {
    const db = await getDb();
    await db
      .collection<IJobTag>("job_tags")
      .updateOne({ _id: id }, { $set: data });
    return db.collection<IJobTag>("job_tags").findOne({ _id: id });
  }

  static async deleteJobTag(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IJobTag>("job_tags")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
