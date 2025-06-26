import { ObjectId } from "mongodb";

export interface IUserSkill {
  _id?: ObjectId;
  user_id: ObjectId;
  skill_name: string;
  skill_description: string;
}

export const DEFAULT_USER_SKILL_VALS = (): IUserSkill => ({
  user_id: new ObjectId(),
  skill_name: "",
  skill_description: "",
});
