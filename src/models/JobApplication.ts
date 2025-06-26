import { ObjectId } from "mongodb";

export interface IJobApplication {
  _id?: ObjectId;
  job_id: ObjectId;
  user_id: ObjectId;
  why_interested: string;
  relevant_skills: string;
  hope_to_gain: string;
  created_at: Date;
  application_status: string;
  review_feedback: string;
  isComplete: boolean;
}

export const DEFAULT_JOB_APPLICATION_VALS = (): IJobApplication => ({
  job_id: new ObjectId(),
  user_id: new ObjectId(),
  why_interested: "",
  relevant_skills: "",
  hope_to_gain: "",
  created_at: new Date(),
  application_status: "",
  review_feedback: "",
  isComplete: false,
});
