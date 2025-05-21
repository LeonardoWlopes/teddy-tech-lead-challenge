output "frontend_bucket_name" {
  description = "Frontend S3 bucket name"
  value       = aws_s3_bucket.frontend.bucket
}

output "frontend_website_endpoint" {
  description = "Frontend S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "ecr_repository_url" {
  description = "ECR repository URL for the backend"
  value       = aws_ecr_repository.backend.repository_url
}

output "app_runner_service_url" {
  description = "App Runner service URL for the backend"
  value       = aws_apprunner_service.backend.service_url
}

output "db_instance_endpoint" {
  description = "RDS PostgreSQL instance endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "db_instance_name" {
  description = "Database name"
  value       = aws_db_instance.postgres.db_name
}

output "db_instance_username" {
  description = "Database username"
  value       = aws_db_instance.postgres.username
}

output "github_actions_role_arn" {
  description = "GitHub Actions role ARN"
  value       = aws_iam_role.github_actions.arn
}

output "app_runner_role_arn" {
  description = "App Runner role ARN"
  value       = aws_iam_role.app_runner.arn
} 