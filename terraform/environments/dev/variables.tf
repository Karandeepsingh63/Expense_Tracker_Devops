variable "aws_region" {
  description = "AWS region for ECR"
  type        = string
}

variable "frontend_repository_name" {
  description = "Frontend ECR repository name"
  type        = string
}

variable "backend_repository_name" {
  description = "Backend ECR repository name"
  type        = string
}