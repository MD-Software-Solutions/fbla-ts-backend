import { ObjectId } from "mongodb";
import { IJobPosting, DEFAULT_JOB_POSTING_VALS } from "@src/models/JobPosting";
import { getDb } from "@src/common/util/mongo";

export default class JobPostingService {
  static async createJobPosting(
    data: Partial<IJobPosting>
  ): Promise<IJobPosting> {
    const job: IJobPosting = {
      ...DEFAULT_JOB_POSTING_VALS(),
      ...data,
      created_at: new Date(),
      date_created: new Date(),
    };
    const db = await getDb();
    const result = await db
      .collection<IJobPosting>("job_postings")
      .insertOne(job);
    return { ...job, _id: result.insertedId };
  }

  static async getAllJobPostings(): Promise<IJobPosting[]> {
    const db = await getDb();
    return db.collection<IJobPosting>("job_postings").find({}).toArray();
  }

  static async getJobPostingById(id: ObjectId): Promise<IJobPosting | null> {
    const db = await getDb();
    return db.collection<IJobPosting>("job_postings").findOne({ _id: id });
  }

  static async updateJobPosting(
    id: ObjectId,
    data: Partial<IJobPosting>
  ): Promise<IJobPosting | null> {
    const db = await getDb();
    await db
      .collection<IJobPosting>("job_postings")
      .updateOne({ _id: id }, { $set: data });
    return db.collection<IJobPosting>("job_postings").findOne({ _id: id });
  }

  static async deleteJobPosting(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IJobPosting>("job_postings")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
