locals {
  name_prefix = "teddy-${var.environment}"
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