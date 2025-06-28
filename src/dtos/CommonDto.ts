// Common DTOs for shared types and responses

export interface SuccessResponseDto {
  message: string;
}

export interface ErrorResponseDto {
  error: string;
  details?: string;
}

export interface CountResponseDto {
  count: number;
}

export interface AdminStatusResponseDto {
  user_id: number;
  isAdmin: boolean;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FileUploadDto {
  file: Express.Multer.File;
}

export interface ValidationErrorDto {
  field: string;
  message: string;
}

export interface AuthTokenDto {
  token: string;
  expiresIn: string;
}

export interface DatabaseErrorDto {
  error: string;
  code?: string;
  query?: string;
}
