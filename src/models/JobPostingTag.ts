import { ObjectId } from "mongodb";

export interface IJobPostingTag {
  _id?: ObjectId;
  job_id: ObjectId;
  tag_id: ObjectId;
}

export const DEFAULT_JOB_POSTING_TAG_VALS = (): IJobPostingTag => ({
  job_id: new ObjectId(),
  tag_id: new ObjectId(),
});
