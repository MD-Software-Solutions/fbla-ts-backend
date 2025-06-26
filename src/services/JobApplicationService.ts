import { ObjectId } from "mongodb";
import {
  IJobApplication,
  DEFAULT_JOB_APPLICATION_VALS,
} from "@src/models/JobApplication";
import { getDb } from "@src/common/util/mongo";

export default class JobApplicationService {
  static async createJobApplication(
    data: Partial<IJobApplication>
  ): Promise<IJobApplication> {
    const application: IJobApplication = {
      ...DEFAULT_JOB_APPLICATION_VALS(),
      ...data,
      created_at: new Date(),
    };
    const db = await getDb();
    const result = await db
      .collection<IJobApplication>("job_applications")
      .insertOne(application);
    return { ...application, _id: result.insertedId };
  }

  static async getAllJobApplications(): Promise<IJobApplication[]> {
    const db = await getDb();
    return db
      .collection<IJobApplication>("job_applications")
      .find({})
      .toArray();
  }

  static async getJobApplicationById(
    id: ObjectId
  ): Promise<IJobApplication | null> {
    const db = await getDb();
    return db
      .collection<IJobApplication>("job_applications")
      .findOne({ _id: id });
  }

  static async updateJobApplication(
    id: ObjectId,
    data: Partial<IJobApplication>
  ): Promise<IJobApplication | null> {
    const db = await getDb();
    await db
      .collection<IJobApplication>("job_applications")
      .updateOne({ _id: id }, { $set: data });
    return db
      .collection<IJobApplication>("job_applications")
      .findOne({ _id: id });
  }

  static async deleteJobApplication(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IJobApplication>("job_applications")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
