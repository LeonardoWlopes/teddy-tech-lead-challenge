variable "aws_region" {
  description = "Região da AWS onde os recursos serão criados"
  type        = string
  default     = "us-east-2"
}

variable "environment" {
  description = "Ambiente de implantação (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "frontend_bucket_name" {
  description = "Nome do bucket S3 para o frontend"
  type        = string
  default     = "frontend"
}

variable "ecr_repository_name" {
  description = "Nome do repositório ECR para as imagens Docker do backend"
  type        = string
  default     = "backend"
}

variable "db_name" {
  description = "Nome do banco de dados PostgreSQL"
  type        = string
  default     = "teddy"
}

variable "db_username" {
  description = "Nome de usuário para o banco de dados PostgreSQL"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Senha para o banco de dados PostgreSQL (use terraform.tfvars para definir em produção)"
  type        = string
  default     = "changeme123" # Não use isso em produção, defina em terraform.tfvars
  sensitive   = true
} 