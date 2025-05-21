resource "aws_iam_role" "app_runner" {
  name = "${local.name_prefix}-app-runner-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "build.apprunner.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role" "app_runner_instance" {
  name = "${local.name_prefix}-app-runner-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "tasks.apprunner.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "app_runner_instance" {
  name = "${local.name_prefix}-app-runner-instance-policy"
  role = aws_iam_role.app_runner_instance.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "ssm:GetParameters",
          "ssm:GetParameter",
          "ssm:GetParametersByPath"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "app_runner_ecr" {
  role       = aws_iam_role.app_runner.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

resource "aws_ssm_parameter" "db_password" {
  name  = "DB_PASSWORD"
  type  = "SecureString"
  value = var.db_password
}

resource "aws_apprunner_service" "backend" {
  service_name = "${local.name_prefix}-backend"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.app_runner.arn
    }

    image_repository {
      image_configuration {
        port = "3000"
        runtime_environment_variables = {
          NODE_ENV     = var.environment
          DB_HOST      = aws_db_instance.postgres.address
          DB_PORT      = aws_db_instance.postgres.port
          DB_NAME      = aws_db_instance.postgres.db_name
          DB_USERNAME  = aws_db_instance.postgres.username
        }
        runtime_environment_secrets = {
          DB_PASSWORD  = "DB_PASSWORD"
        }
      }
      image_identifier      = "${aws_ecr_repository.backend.repository_url}:latest"
      image_repository_type = "ECR"
    }
  }

  instance_configuration {
    cpu    = "1024"  # 1 vCPU
    memory = "2048"  # 2 GB
    instance_role_arn = aws_iam_role.app_runner_instance.arn
  }

  tags = {
    Name = "${local.name_prefix}-backend"
    IAC  = "True"
  }
} 