// User Skills DTOs for request/response validation

export interface CreateUserSkillDto {
  user_id: number;
  skill_name: string;
  skill_description: string;
}

export interface UpdateUserSkillDto {
  skill_name?: string;
  skill_description?: string;
}

export interface UserSkillResponseDto {
  skill_id: number;
  user_id: number;
  skill_name: string;
  skill_description: string;
  created_at?: Date;
  updated_at?: Date;
}
