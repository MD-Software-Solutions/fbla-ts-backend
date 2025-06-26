import { ObjectId } from "mongodb";
import { IUserSkill, DEFAULT_USER_SKILL_VALS } from "@src/models/UserSkill";
import { getDb } from "@src/common/util/mongo";

export default class UserSkillService {
  static async createUserSkill(data: Partial<IUserSkill>): Promise<IUserSkill> {
    const skill: IUserSkill = {
      ...DEFAULT_USER_SKILL_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db
      .collection<IUserSkill>("user_skills")
      .insertOne(skill);
    return { ...skill, _id: result.insertedId };
  }

  static async getAllUserSkills(): Promise<IUserSkill[]> {
    const db = await getDb();
    return db.collection<IUserSkill>("user_skills").find({}).toArray();
  }

  static async getUserSkillById(id: ObjectId): Promise<IUserSkill | null> {
    const db = await getDb();
    return db.collection<IUserSkill>("user_skills").findOne({ _id: id });
  }

  static async updateUserSkill(
    id: ObjectId,
    data: Partial<IUserSkill>
  ): Promise<IUserSkill | null> {
    const db = await getDb();
    await db
      .collection<IUserSkill>("user_skills")
      .updateOne({ _id: id }, { $set: data });
    return db.collection<IUserSkill>("user_skills").findOne({ _id: id });
  }

  static async deleteUserSkill(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IUserSkill>("user_skills")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
