// User Achievements DTOs for request/response validation

export interface CreateUserAchievementDto {
  user_id: number;
  achievement_name: string;
  achievement_description: string;
}

export interface UpdateUserAchievementDto {
  achievement_name?: string;
  achievement_description?: string;
}

export interface UserAchievementResponseDto {
  achievement_id: number;
  user_id: number;
  achievement_name: string;
  achievement_description: string;
  created_at?: Date;
  updated_at?: Date;
}
