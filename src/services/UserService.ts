import { ObjectId } from "mongodb";
import { IUser, DEFAULT_USER_VALS } from "@src/models/User";
import bcrypt from "bcryptjs";
import { getDb } from "@src/common/util/mongo";

export default class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    if (!data.password_hash) throw new Error("Password required");
    const hash = await bcrypt.hash(data.password_hash, 10);
    const user: IUser = {
      ...DEFAULT_USER_VALS(),
      ...data,
      password_hash: hash,
      created_at: new Date(),
    };
    const db = await getDb();
    const result = await db.collection<IUser>("users").insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async getAllUsers(): Promise<IUser[]> {
    const db = await getDb();
    return db.collection<IUser>("users").find({}).toArray();
  }

  static async getUserById(id: ObjectId): Promise<IUser | null> {
    const db = await getDb();
    return db.collection<IUser>("users").findOne({ _id: id });
  }

  static async getUserByUsername(
    account_username: string
  ): Promise<IUser | null> {
    const db = await getDb();
    return db.collection<IUser>("users").findOne({ account_username });
  }

  static async updateUser(
    id: ObjectId,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    const db = await getDb();
    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }
    await db.collection<IUser>("users").updateOne({ _id: id }, { $set: data });
    return db.collection<IUser>("users").findOne({ _id: id });
  }

  static async deleteUser(id: ObjectId): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection<IUser>("users").deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
