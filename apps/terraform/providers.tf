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

 