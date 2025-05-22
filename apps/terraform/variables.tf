variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-2"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "frontend_bucket_name" {
  description = "S3 bucket name for the frontend"
  type        = string
  default     = "frontend"
}

variable "ecr_repository_name" {
  description = "ECR repository name for backend Docker images"
  type        = string
  default     = "backend"
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "teddy"
}

variable "db_username" {
  description = "PostgreSQL database username"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "PostgreSQL database password (use terraform.tfvars to set in production)"
  type        = string
  default     = "changeme123" # Don't use this in production, set it in terraform.tfvars
  sensitive   = true
}

variable "github_repository" {
  description = "GitHub repository name in 'owner/repo' format"
  type        = string
  default     = "LeonardoWlopes/teddy-tech-lead-challenge"
}

variable "frontend_domain" {
  description = "Frontend domain name"
  type        = string
  default     = "teddy.leonardolopes.tech"
}

