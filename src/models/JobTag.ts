import { ObjectId } from "mongodb";

export interface IJobTag {
  _id?: ObjectId;
  tag_name: string;
  tag_type: string;
}

export const DEFAULT_JOB_TAG_VALS = (): IJobTag => ({
  tag_name: "",
  tag_type: "",
});
