locals {
  name_prefix = "teddy-${var.environment}"
  
  frontend_bucket_name = var.frontend_domain
  s3_resources = {
    frontend_bucket     = "arn:aws:s3:::${local.frontend_bucket_name}"
    frontend_bucket_all = "arn:aws:s3:::${local.frontend_bucket_name}/*"
  }
  
  resource_names = {
    ecr_repository    = "${local.name_prefix}-${var.ecr_repository_name}"
    postgres_db       = "${local.name_prefix}-postgres"
    app_runner        = "${local.name_prefix}-backend"
    postgres_sg       = "${local.name_prefix}-postgres-sg"
    app_runner_role   = "${local.name_prefix}-app-runner-role"
    app_runner_policy = "${local.name_prefix}-app-runner-policy"
    app_runner_instance_role = "${local.name_prefix}-app-runner-instance-role"
    app_runner_instance_policy = "${local.name_prefix}-app-runner-instance-policy"
    github_actions_role = "${local.name_prefix}-github-actions-role"
    github_actions_policy = "${local.name_prefix}-github-actions-policy"
  }
  
  common_tags = {
    IAC         = "True"
    Environment = var.environment
    Project     = "Teddy"
    ManagedBy   = "Terraform"
  }
  
  resource_tags = {
    frontend = merge(local.common_tags, {
      Name = local.frontend_bucket_name
      Type = "Frontend"
    })
    
    backend = merge(local.common_tags, {
      Name = local.resource_names.app_runner
      Type = "Backend"
    })
    
    database = merge(local.common_tags, {
      Name = local.resource_names.postgres_db
      Type = "Database"
    })
    
    ecr = merge(local.common_tags, {
      Name = "${local.resource_names.ecr_repository}-repo"
      Type = "Container Registry"
    })
    
    network = merge(local.common_tags, {
      Name = local.resource_names.postgres_sg
      Type = "Network"
    })
  }
}

terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "teddy-terraform-state"
    key     = "terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
} 