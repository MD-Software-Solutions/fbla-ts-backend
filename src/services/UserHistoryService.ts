import { ObjectId } from "mongodb";
import {
  IUserHistory,
  DEFAULT_USER_HISTORY_VALS,
} from "@src/models/UserHistory";
import { getDb } from "@src/common/util/mongo";

export default class UserHistoryService {
  static async createUserHistory(
    data: Partial<IUserHistory>
  ): Promise<IUserHistory> {
    const history: IUserHistory = {
      ...DEFAULT_USER_HISTORY_VALS(),
      ...data,
    };
    const db = await getDb();
    const result = await db
      .collection<IUserHistory>("user_history")
      .insertOne(history);
    return { ...history, _id: result.insertedId };
  }

  static async getAllUserHistory(): Promise<IUserHistory[]> {
    const db = await getDb();
    return db.collection<IUserHistory>("user_history").find({}).toArray();
  }

  static async getUserHistoryById(id: ObjectId): Promise<IUserHistory | null> {
    const db = await getDb();
    return db.collection<IUserHistory>("user_history").findOne({ _id: id });
  }

  static async updateUserHistory(
    id: ObjectId,
    data: Partial<IUserHistory>
  ): Promise<IUserHistory | null> {
    const db = await getDb();
    await db
      .collection<IUserHistory>("user_history")
      .updateOne({ _id: id }, { $set: data });
    return db.collection<IUserHistory>("user_history").findOne({ _id: id });
  }

  static async deleteUserHistory(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db
      .collection<IUserHistory>("user_history")
      .deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
