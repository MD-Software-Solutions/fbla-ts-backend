// Job Posting DTOs for request/response validation

export interface CreateJobPostingDto {
  user_id: number;
  job_title: string;
  job_description: string;
  job_signup_form?: string;
  job_type_tag?: string;
  industry_tag?: string;
  user_avatar?: string;
  date_created?: string;
}

export interface UpdateJobPostingDto {
  job_title?: string;
  job_description?: string;
  job_signup_form?: string;
  job_type_tag?: string;
  industry_tag?: string;
}

export interface JobPostingResponseDto {
  job_id: number;
  user_id: number;
  job_title: string;
  job_description: string;
  job_signup_form?: string;
  job_type_tag?: string;
  industry_tag?: string;
  user_avatar?: string;
  date_created: Date;
  isApproved: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ToggleApprovalDto {
  isApproved: boolean;
}

export interface ApprovalResponseDto {
  message: string;
  job_id: number;
  new_status: boolean;
}

export interface JobPostCountDto {
  user_id: number;
  total_posts: number;
}
