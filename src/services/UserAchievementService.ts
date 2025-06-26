import { ObjectId } from "mongodb";
import {
  IUserAchievement,
  DEFAULT_USER_ACHIEVEMENT_VALS,
} from "@src/models/UserAchievement";
import { getDb } from "@src/common/util/mongo";

export default class UserAchievementService {
  static async createUserAchievement(
    data: Partial<IUserAchievement>
  ): Promise<IUserAchievement> {
    const achievement: IUserAchievement = {
      ...DEFAULT_USER_ACHIEVEMENT_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db
      .collection<IUserAchievement>("user_achievements")
      .insertOne(achievement);
    return { ...achievement, _id: result.insertedId };
  }

  static async getAllUserAchievements(): Promise<IUserAchievement[]> {
    const db = await getDb();
    return db
      .collection<IUserAchievement>("user_achievements")
      .find({})
      .toArray();
  }

  static async getUserAchievementById(
    id: ObjectId
  ): Promise<IUserAchievement | null> {
    const db = await getDb();
    return db
      .collection<IUserAchievement>("user_achievements")
      .findOne({ _id: id });
  }

  static async updateUserAchievement(
    id: ObjectId,
    data: Partial<IUserAchievement>
  ): Promise<IUserAchievement | null> {
    const db = await getDb();
    await db
      .collection<IUserAchievement>("user_achievements")
      .updateOne({ _id: id }, { $set: data });
    return db
      .collection<IUserAchievement>("user_achievements")
      .findOne({ _id: id });
  }

  static async deleteUserAchievement(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IUserAchievement>("user_achievements")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
