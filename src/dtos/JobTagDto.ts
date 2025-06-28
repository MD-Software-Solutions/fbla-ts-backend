// Job Tags DTOs for request/response validation

export interface CreateJobTagDto {
  tag_name: string;
  tag_type: string;
}

export interface UpdateJobTagDto {
  tag_name?: string;
  tag_type?: string;
}

export interface JobTagResponseDto {
  tag_id: number;
  tag_name: string;
  tag_type: string;
  created_at?: Date;
  updated_at?: Date;
}
