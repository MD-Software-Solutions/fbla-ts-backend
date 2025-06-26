import { ObjectId } from "mongodb";

export interface IJobPosting {
  _id?: ObjectId;
  user_id: ObjectId;
  job_title: string;
  job_description: string;
  job_signup_form: string;
  job_type_tag: any;
  industry_tag: any;
  created_at: Date;
  user_avatar: string;
  isApproved: boolean;
  date_created: Date;
}

export const DEFAULT_JOB_POSTING_VALS = (): IJobPosting => ({
  user_id: new ObjectId(),
  job_title: "",
  job_description: "",
  job_signup_form: "",
  job_type_tag: {},
  industry_tag: {},
  created_at: new Date(),
  user_avatar: "",
  isApproved: false,
  date_created: new Date(),
});
