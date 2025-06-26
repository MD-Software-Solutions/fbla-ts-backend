// User DTOs for request/response validation

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
}

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  created: Date;
}
