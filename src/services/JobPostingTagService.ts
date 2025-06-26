import { ObjectId } from "mongodb";
import {
  IJobPostingTag,
  DEFAULT_JOB_POSTING_TAG_VALS,
} from "@src/models/JobPostingTag";
import { getDb } from "@src/common/util/mongo";

export default class JobPostingTagService {
  static async createJobPostingTag(
    data: Partial<IJobPostingTag>
  ): Promise<IJobPostingTag> {
    const tag: IJobPostingTag = {
      ...DEFAULT_JOB_POSTING_TAG_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db
      .collection<IJobPostingTag>("job_posting_tags")
      .insertOne(tag);
    return { ...tag, _id: result.insertedId };
  }

  static async getAllJobPostingTags(): Promise<IJobPostingTag[]> {
    const db = await getDb();
    return db.collection<IJobPostingTag>("job_posting_tags").find({}).toArray();
  }

  static async getJobPostingTagById(
    id: ObjectId
  ): Promise<IJobPostingTag | null> {
    const db = await getDb();
    return db
      .collection<IJobPostingTag>("job_posting_tags")
      .findOne({ _id: id });
  }

  static async updateJobPostingTag(
    id: ObjectId,
    data: Partial<IJobPostingTag>
  ): Promise<IJobPostingTag | null> {
    const db = await getDb();
    await db
      .collection<IJobPostingTag>("job_posting_tags")
      .updateOne({ _id: id }, { $set: data });
    return db
      .collection<IJobPostingTag>("job_posting_tags")
      .findOne({ _id: id });
  }

  static async deleteJobPostingTag(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IJobPostingTag>("job_posting_tags")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
