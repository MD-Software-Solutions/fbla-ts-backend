import { ObjectId } from "mongodb";
import {
  IUserProject,
  DEFAULT_USER_PROJECT_VALS,
} from "@src/models/UserProject";
import { getDb } from "@src/common/util/mongo";

export default class UserProjectService {
  static async createUserProject(
    data: Partial<IUserProject>
  ): Promise<IUserProject> {
    const project: IUserProject = {
      ...DEFAULT_USER_PROJECT_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db
      .collection<IUserProject>("user_projects")
      .insertOne(project);
    return { ...project, _id: result.insertedId };
  }

  static async getAllUserProjects(): Promise<IUserProject[]> {
    const db = await getDb();
    return db.collection<IUserProject>("user_projects").find({}).toArray();
  }

  static async getUserProjectById(id: ObjectId): Promise<IUserProject | null> {
    const db = await getDb();
    return db.collection<IUserProject>("user_projects").findOne({ _id: id });
  }

  static async updateUserProject(
    id: ObjectId,
    data: Partial<IUserProject>
  ): Promise<IUserProject | null> {
    const db = await getDb();
    await db
      .collection<IUserProject>("user_projects")
      .updateOne({ _id: id }, { $set: data });
    return db.collection<IUserProject>("user_projects").findOne({ _id: id });
  }

  static async deleteUserProject(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IUserProject>("user_projects")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
