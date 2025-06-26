import { ObjectId } from "mongodb";

/******************************************************************************
                                 Types
******************************************************************************/

export interface IUser {
  _id?: ObjectId;
  real_name: string;
  personal_email: string;
  phone_number: string;
  birth_date: Date;
  school_name: string;
  school_district: string;
  school_email: string;
  account_username: string;
  password_hash: string;
  is_teacher: boolean;
  city: string;
  state: string;
  bio: string;
  profile_img_url: string;
  created_at: Date;
  avatar_name: string;
}

/******************************************************************************
                                 Defaults
******************************************************************************/

export const DEFAULT_USER_VALS = (): IUser => ({
  real_name: "",
  personal_email: "",
  phone_number: "",
  birth_date: new Date(),
  school_name: "",
  school_district: "",
  school_email: "",
  account_username: "",
  password_hash: "",
  is_teacher: false,
  city: "",
  state: "",
  bio: "",
  profile_img_url: "",
  created_at: new Date(),
  avatar_name: "",
});
