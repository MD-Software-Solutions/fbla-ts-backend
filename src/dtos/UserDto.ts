// User DTOs for request/response validation

export interface CreateUserDto {
  real_name: string;
  personal_email: string;
  phone_number?: string;
  birth_date?: string;
  school_name?: string;
  school_district?: string;
  school_email?: string;
  account_username: string;
  password: string;
  is_teacher?: boolean;
  city?: string;
  state?: string;
  bio?: string;
  profile_img_url?: string;
  avatar_name?: string;
}

export interface UpdateUserDto {
  real_name?: string;
  personal_email?: string;
  phone_number?: string;
  birth_date?: string;
  school_name?: string;
  school_district?: string;
  school_email?: string;
  account_username?: string;
  is_teacher?: boolean;
  city?: string;
  state?: string;
  bio?: string;
  profile_img_url?: string;
  avatar_name?: string;
}

export interface UserResponseDto {
  user_id: number;
  real_name: string;
  personal_email: string;
  phone_number?: string;
  birth_date?: string;
  school_name?: string;
  school_district?: string;
  school_email?: string;
  account_username: string;
  is_teacher: boolean;
  city?: string;
  state?: string;
  bio?: string;
  profile_img_url?: string;
  avatar_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignInResponseDto {
  message: string;
  token: string;
  user: {
    username: string;
  };
}

export interface UserProfileDto {
  first_name?: string;
  last_name?: string;
  account_username?: string;
  account_email?: string;
  phone_number?: string;
  education_level?: string;
  field_of_study?: string;
  gpa?: string;
  school?: string;
  graduation_date?: string;
  work_experience?: string;
  skills?: string;
  career_goals?: string;
  job_preferences?: string;
  location?: string;
  bio?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
}
