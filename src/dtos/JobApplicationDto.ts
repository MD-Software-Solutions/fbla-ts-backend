// Job Application DTOs for request/response validation

export interface CreateJobApplicationDto {
  job_id: number;
  user_id: number;
  why_interested: string;
  relevant_skills: string;
  hope_to_gain: string;
}

export interface UpdateApplicationStatusDto {
  application_status?: string;
  review_feedback?: string;
  isComplete?: boolean;
  interview_date?: string;
  interview_location?: string;
}

export interface JobApplicationResponseDto {
  application_id: number;
  job_id: number;
  user_id: number;
  why_interested: string;
  relevant_skills: string;
  hope_to_gain: string;
  application_status?: string;
  review_feedback?: string;
  isComplete: boolean;
  interviewDate?: string;
  interviewLocation?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ApplicationUpdateResponseDto {
  message: string;
  updatedFields: {
    application_status?: string;
    review_feedback?: string;
    isComplete?: boolean;
  };
}
