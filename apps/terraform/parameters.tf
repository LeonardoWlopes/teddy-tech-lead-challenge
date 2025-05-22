resource "aws_ssm_parameter" "db_password" {
  name  = "DB_PASSWORD"
  type  = "SecureString"
  value = var.db_password

  tags = {
    Environment = var.environment
    IAC         = "True"
  }
} 