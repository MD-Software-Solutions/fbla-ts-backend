import { ObjectId } from "mongodb";

export interface IUserHistory {
  _id?: ObjectId;
  user_id: ObjectId;
  company_name: string;
  role: string;
  duration: string;
  description: string;
}

export const DEFAULT_USER_HISTORY_VALS = (): IUserHistory => ({
  user_id: new ObjectId(),
  company_name: "",
  role: "",
  duration: "",
  description: "",
});
