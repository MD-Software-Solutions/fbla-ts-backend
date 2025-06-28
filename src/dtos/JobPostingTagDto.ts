// Job Posting Tags DTOs for request/response validation

export interface CreateJobPostingTagDto {
  job_id: number;
  tag_id: number;
}

export interface JobPostingTagResponseDto {
  posting_tag_id: number;
  job_id: number;
  tag_id: number;
  created_at?: Date;
  updated_at?: Date;
}
