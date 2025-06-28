// AI Service DTOs for request/response validation

export interface GenerateBioDto {
  userInput: string;
}

export interface BioResponseDto {
  bio: string;
}

export interface GenerateInterviewQuestionsDto {
  jobDetails: {
    job_title: string;
    job_description?: string;
    industry_tag?: string;
  };
  applicationDetails: {
    why_interested: string;
    relevant_skills: string;
    hope_to_gain: string;
  };
}

export interface InterviewQuestionsResponseDto {
  questions: string[];
}

export interface TextToSpeechDto {
  text: string;
}

export interface SpeechToTextResponseDto {
  text: string;
  warning?: string;
}

export interface GenerateInterviewFeedbackDto {
  jobDetails: {
    job_title: string;
    job_description?: string;
    required_skills?: string;
  };
  responses: {
    question: string;
    answer: string;
  }[];
}

export interface InterviewFeedbackResponseDto {
  feedback: string;
}

export interface GenerateJobFilterDto {
  jobPosts: {
    jobTitle: string;
    jobDescription: string;
    posterUsername: string;
    filters: string;
  }[];
  users: {
    skills?: { skill_name: string }[];
    projects?: { project_name: string }[];
    history?: { role: string }[];
    bio?: string;
  }[];
}

export interface JobFilterResponseDto {
  filteredJobs: string;
}

export interface ChatDto {
  message: string;
  context?: any;
  userData?: {
    first_name?: string;
    last_name?: string;
    account_username?: string;
    account_email?: string;
    phone_number?: string;
    education_level?: string;
    field_of_study?: string;
    gpa?: string;
    school?: string;
    graduation_date?: string;
    work_experience?: string;
    skills?: string;
    career_goals?: string;
    job_preferences?: string;
    location?: string;
    bio?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    resume_url?: string;
  };
}

export interface ChatResponseDto {
  response: string;
}
