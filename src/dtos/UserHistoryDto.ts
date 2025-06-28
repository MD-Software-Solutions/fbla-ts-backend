// User History DTOs for request/response validation

export interface CreateUserHistoryDto {
  user_id: number;
  company_name: string;
  role: string;
  duration: string;
  description: string;
}

export interface UpdateUserHistoryDto {
  company_name?: string;
  role?: string;
  duration?: string;
  description?: string;
}

export interface UserHistoryResponseDto {
  history_id: number;
  user_id: number;
  company_name: string;
  role: string;
  duration: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}
