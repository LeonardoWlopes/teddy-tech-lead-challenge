terraform {
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

provider "aws" {
  region  = var.aws_region
  profile = "default"

  default_tags {
    tags = {
      Project     = "teddy"
      Environment = var.environment
      ManagedBy   = "terraform"
      IAC         = "True"
    }
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "teddy-terraform-state"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    IAC = "True"
  }
}

locals {
  name_prefix = "teddy-${var.environment}"
} 