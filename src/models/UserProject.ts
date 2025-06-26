import { ObjectId } from "mongodb";

export interface IUserProject {
  _id?: ObjectId;
  user_id: ObjectId;
  project_name: string;
  project_description: string;
}

export const DEFAULT_USER_PROJECT_VALS = (): IUserProject => ({
  user_id: new ObjectId(),
  project_name: "",
  project_description: "",
});
