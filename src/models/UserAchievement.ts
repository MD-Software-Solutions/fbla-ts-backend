import { ObjectId } from "mongodb";

export interface IUserAchievement {
  _id?: ObjectId;
  user_id: ObjectId;
  achievement_name: string;
  achievement_description: string;
}

export const DEFAULT_USER_ACHIEVEMENT_VALS = (): IUserAchievement => ({
  user_id: new ObjectId(),
  achievement_name: "",
  achievement_description: "",
});
