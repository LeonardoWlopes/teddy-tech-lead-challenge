provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "teddy"
      Environment = var.environment
      ManagedBy   = "terraform"
      IAC         = "True"
    }
  }
}

 