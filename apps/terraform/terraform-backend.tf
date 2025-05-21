resource "aws_s3_bucket" "terraform_state" {
  bucket = "teddy-terraform-state"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    IAC = "True"
  }
} 