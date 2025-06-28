// User Projects DTOs for request/response validation

export interface CreateUserProjectDto {
  user_id: number;
  project_name: string;
  project_description: string;
}

export interface UpdateUserProjectDto {
  project_name?: string;
  project_description?: string;
}

export interface UserProjectResponseDto {
  project_id: number;
  user_id: number;
  project_name: string;
  project_description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProjectCountDto {
  user_id: number;
  total_projects: number;
}
