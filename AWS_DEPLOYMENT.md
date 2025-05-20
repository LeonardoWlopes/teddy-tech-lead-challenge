# AWS Deployment Architecture

This document outlines the proposed AWS infrastructure deployment for the Teddy Tech Lead Challenge application, using GitHub Actions for CI/CD and Terraform for infrastructure as code.

## Architecture Overview

The application will be deployed on AWS with the following architecture:

```bash
                                  ┌─────────────────┐
                                  │   CloudFront    │
                                  │   (Frontend)    │
                                  └────────┬────────┘
                                           │
                                           ▼
┌─────────────────┐              ┌─────────────────┐
│  GitHub Actions │─────────────▶│     S3 Bucket   │
│      CI/CD      │              │  (Static Files) │
└───────┬─────────┘              └─────────────────┘
        │
        │                         ┌─────────────────┐
        │                         │  Load Balancer  │
        └────────────────────────▶│      (ALB)      │
                                  └────────┬────────┘
                                           │
                                           ▼
                        ┌───────────────────────────────────┐
                        │        ECS Fargate Cluster        │
                        │                                   │
                        │  ┌─────────────┐ ┌─────────────┐  │
                        │  │   Backend   │ │   Backend   │  │
                        │  │  Container  │ │  Container  │  │
                        │  │  (Task 1)   │ │  (Task 2)   │  │
                        │  └──────┬──────┘ └──────┬──────┘  │
                        └────────┬────────────────┘         │
                                 │                           │
                                 ▼                           │
                        ┌─────────────────┐                  │
                        │     RDS DB      │                  │
                        │   (PostgreSQL)  │                  │
                        └─────────────────┘                  │
                                                             │
                        ┌─────────────────┐                  │
                        │ AWS Secrets Mgr │◀─────────────────┘
                        │  (Credentials)  │
                        └─────────────────┘
```

## Infrastructure Components

### Frontend

- **S3 Bucket**: Hosts the static frontend files
- **CloudFront**: CDN for the frontend, providing caching and HTTPS
- **Route 53**: DNS management (optional depending on domain requirements)

### Backend

- **ECS Fargate**: Serverless container orchestration
- **ALB (Application Load Balancer)**: Routes traffic to backend containers
- **ECR (Elastic Container Registry)**: Stores Docker images

### Database

- **RDS PostgreSQL**: Managed relational database
- **RDS Read Replicas**: Optional for scaling read-heavy workloads

### Supporting Services

- **AWS Secrets Manager**: Securely stores database credentials and API keys
- **CloudWatch**: Monitoring and logging
- **AWS WAF**: Web Application Firewall for security (optional)
- **AWS Certificate Manager**: SSL/TLS certificates

## Monorepo Integration

Add a new app `infra` to the monorepo structure:

```bash
teddy-techlead-challenge/
├── apps/
│   ├── backend/     # NestJS API
│   ├── frontend/    # React application
│   └── infra/       # Terraform infrastructure code
├── packages/        # Shared packages
└── ... configuration files
```

### Terraform Code Organization

The `apps/infra` directory should be structured as follows:

```bash
apps/infra/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   └── prod/
│       ├── main.tf
│       ├── variables.tf
│       └── terraform.tfvars
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── database/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── container/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── frontend/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── package.json
└── README.md
```

## CI/CD Pipeline with GitHub Actions

Create the following GitHub Actions workflows in `.github/workflows/`:

### 1. Infrastructure Deployment Workflow

```yaml
# .github/workflows/terraform.yml
name: "Terraform Deployment"

on:
    push:
        branches: [main, develop]
        paths:
            - "apps/infra/**"
    pull_request:
        paths:
            - "apps/infra/**"

jobs:
    terraform:
        name: "Terraform"
        runs-on: ubuntu-latest
        defaults:
            run:
                working-directory: apps/infra

        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Setup Terraform
              uses: hashicorp/setup-terraform@v2
              with:
                  terraform_version: 1.3.0

            - name: Configure AWS Credentials
              uses: aws-actions/configure-aws-credentials@v1
              with:
                  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws-region: ${{ secrets.AWS_REGION }}

            - name: Terraform Format
              id: fmt
              run: terraform fmt -check

            - name: Terraform Init
              id: init
              run: |
                  cd environments/$([ "${{ github.ref }}" == "refs/heads/main" ] && echo "prod" || echo "dev")
                  terraform init

            - name: Terraform Validate
              id: validate
              run: |
                  cd environments/$([ "${{ github.ref }}" == "refs/heads/main" ] && echo "prod" || echo "dev")
                  terraform validate

            - name: Terraform Plan
              id: plan
              if: github.event_name == 'pull_request'
              run: |
                  cd environments/$([ "${{ github.ref }}" == "refs/heads/main" ] && echo "prod" || echo "dev")
                  terraform plan -no-color

            - name: Terraform Apply
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              run: |
                  cd environments/$([ "${{ github.ref }}" == "refs/heads/main" ] && echo "prod" || echo "dev")
                  terraform apply -auto-approve
```

### 2. Backend Deployment Workflow

```yaml
# .github/workflows/backend.yml
name: "Backend CI/CD"

on:
    push:
        branches: [main, develop]
        paths:
            - "apps/backend/**"
    pull_request:
        paths:
            - "apps/backend/**"

jobs:
    build-and-deploy:
        name: "Build and Deploy Backend"
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: "22"

            - name: Install pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 9.15.4

            - name: Install dependencies
              run: pnpm install

            - name: Lint and Test
              run: |
                  pnpm --filter @repo/backend lint
                  pnpm --filter @repo/backend test

            - name: Build
              run: pnpm --filter @repo/backend build

            - name: Configure AWS Credentials
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              uses: aws-actions/configure-aws-credentials@v1
              with:
                  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws-region: ${{ secrets.AWS_REGION }}

            - name: Login to Amazon ECR
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              id: login-ecr
              uses: aws-actions/amazon-ecr-login@v1

            - name: Build and Push Docker Image
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              env:
                  ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY_BACKEND }}
                  IMAGE_TAG: ${{ github.sha }}
                  ENVIRONMENT: ${{ github.ref == 'refs/heads/main' && 'prod' || 'dev' }}
              run: |
                  cd apps/backend
                  docker build -t ${{ steps.login-ecr.outputs.registry }}/$ECR_REPOSITORY:$IMAGE_TAG -t ${{ steps.login-ecr.outputs.registry }}/$ECR_REPOSITORY:latest-$ENVIRONMENT .
                  docker push ${{ steps.login-ecr.outputs.registry }}/$ECR_REPOSITORY:$IMAGE_TAG
                  docker push ${{ steps.login-ecr.outputs.registry }}/$ECR_REPOSITORY:latest-$ENVIRONMENT

            - name: Update ECS Service
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              env:
                  ECS_CLUSTER: ${{ github.ref == 'refs/heads/main' && secrets.ECS_CLUSTER_PROD || secrets.ECS_CLUSTER_DEV }}
                  ECS_SERVICE: ${{ github.ref == 'refs/heads/main' && secrets.ECS_SERVICE_BACKEND_PROD || secrets.ECS_SERVICE_BACKEND_DEV }}
              run: |
                  aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --force-new-deployment
```

### 3. Frontend Deployment Workflow

```yaml
# .github/workflows/frontend.yml
name: "Frontend CI/CD"

on:
    push:
        branches: [main, develop]
        paths:
            - "apps/frontend/**"
    pull_request:
        paths:
            - "apps/frontend/**"

jobs:
    build-and-deploy:
        name: "Build and Deploy Frontend"
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: "22"

            - name: Install pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 9.15.4

            - name: Install dependencies
              run: pnpm install

            - name: Lint and Test
              run: |
                  pnpm --filter @repo/frontend lint
                  pnpm --filter @repo/frontend test

            - name: Build
              env:
                  VITE_API_URL: ${{ github.ref == 'refs/heads/main' && secrets.PROD_API_URL || secrets.DEV_API_URL }}
              run: |
                  pnpm --filter @repo/frontend build

            - name: Configure AWS Credentials
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              uses: aws-actions/configure-aws-credentials@v1
              with:
                  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws-region: ${{ secrets.AWS_REGION }}

            - name: Deploy to S3
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              env:
                  S3_BUCKET: ${{ github.ref == 'refs/heads/main' && secrets.S3_BUCKET_PROD || secrets.S3_BUCKET_DEV }}
              run: |
                  aws s3 sync apps/frontend/dist/ s3://$S3_BUCKET/ --delete

            - name: Invalidate CloudFront Cache
              if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
              env:
                  CLOUDFRONT_DISTRIBUTION_ID: ${{ github.ref == 'refs/heads/main' && secrets.CLOUDFRONT_DISTRIBUTION_ID_PROD || secrets.CLOUDFRONT_DISTRIBUTION_ID_DEV }}
              run: |
                  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

## Terraform Module Examples

### VPC and Networking (modules/networking/main.tf)

```hcl
provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc-${var.environment}"
  }
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index}-${var.environment}"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index}-${var.environment}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw-${var.environment}"
  }
}

# Create security groups, NAT gateways, and route tables as needed
```

### Database (modules/database/main.tf)

```hcl
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group-${var.environment}"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "${var.project_name}-db-subnet-group-${var.environment}"
  }
}

resource "aws_security_group" "db" {
  name        = "${var.project_name}-db-sg-${var.environment}"
  description = "Allow PostgreSQL traffic from ECS containers"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.ecs_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-db-sg-${var.environment}"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name        = "${var.project_name}/db-credentials-${var.environment}"
  description = "Database credentials for ${var.project_name} ${var.environment}"
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db_password.result
    engine   = "postgres"
    host     = aws_db_instance.main.address
    port     = 5432
    dbname   = var.db_name
  })
}

resource "aws_db_instance" "main" {
  identifier             = "${var.project_name}-db-${var.environment}"
  engine                 = "postgres"
  engine_version         = var.db_engine_version
  instance_class         = var.db_instance_class
  allocated_storage      = var.db_allocated_storage
  max_allocated_storage  = var.db_max_allocated_storage
  storage_encrypted      = true
  name                   = var.db_name
  username               = var.db_username
  password               = random_password.db_password.result
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  skip_final_snapshot    = var.environment != "prod"
  deletion_protection    = var.environment == "prod"
  backup_retention_period = var.environment == "prod" ? 7 : 1

  tags = {
    Name = "${var.project_name}-db-${var.environment}"
  }
}
```

### ECS Cluster and Services (modules/container/main.tf)

```hcl
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "${var.project_name}-cluster-${var.environment}"
  }
}

resource "aws_security_group" "ecs" {
  name        = "${var.project_name}-ecs-sg-${var.environment}"
  description = "Security group for ECS tasks"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-ecs-sg-${var.environment}"
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.project_name}-backend-task-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = "${var.project_name}-backend-container-${var.environment}"
      image = "${var.ecr_repository_url}:latest-${var.environment}"

      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment == "prod" ? "production" : "development"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_HOST"
          valueFrom = "${var.db_credentials_arn}:host::"
        },
        {
          name      = "DATABASE_PORT"
          valueFrom = "${var.db_credentials_arn}:port::"
        },
        {
          name      = "DATABASE_USERNAME"
          valueFrom = "${var.db_credentials_arn}:username::"
        },
        {
          name      = "DATABASE_PASSWORD"
          valueFrom = "${var.db_credentials_arn}:password::"
        },
        {
          name      = "DATABASE_NAME"
          valueFrom = "${var.db_credentials_arn}:dbname::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.project_name}-backend-${var.environment}"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name = "${var.project_name}-backend-task-${var.environment}"
  }
}

resource "aws_ecs_service" "backend" {
  name            = "${var.project_name}-backend-service-${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  launch_type     = "FARGATE"
  desired_count   = var.service_desired_count

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "${var.project_name}-backend-container-${var.environment}"
    container_port   = var.container_port
  }

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = {
    Name = "${var.project_name}-backend-service-${var.environment}"
  }
}
```

### Frontend S3 and CloudFront (modules/frontend/main.tf)

```hcl
resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend-${var.environment}"

  tags = {
    Name = "${var.project_name}-frontend-${var.environment}"
  }
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.frontend.iam_arn
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}

resource "aws_cloudfront_origin_access_identity" "frontend" {
  comment = "OAI for ${var.project_name} frontend ${var.environment}"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.bucket}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.frontend.bucket}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = "${var.project_name}-cloudfront-${var.environment}"
  }
}
```

## Environment Configuration

### Dev Environment (environments/dev/main.tf)

```hcl
terraform {
  backend "s3" {
    bucket  = "teddy-terraform-state"
    key     = "teddy/dev/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

module "networking" {
  source = "../../modules/networking"

  aws_region           = var.aws_region
  project_name         = var.project_name
  environment          = "dev"
  vpc_cidr             = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.3.0/24", "10.0.4.0/24"]
  availability_zones   = ["us-east-1a", "us-east-1b"]
}

module "database" {
  source = "../../modules/database"

  project_name            = var.project_name
  environment             = "dev"
  vpc_id                  = module.networking.vpc_id
  private_subnet_ids      = module.networking.private_subnet_ids
  ecs_security_group_id   = module.container.ecs_security_group_id
  db_name                 = "teddy_db"
  db_username             = "postgres"
  db_engine_version       = "14.6"
  db_instance_class       = "db.t3.small"
  db_allocated_storage    = 20
  db_max_allocated_storage = 100
}

module "container" {
  source = "../../modules/container"

  aws_region              = var.aws_region
  project_name            = var.project_name
  environment             = "dev"
  vpc_id                  = module.networking.vpc_id
  private_subnet_ids      = module.networking.private_subnet_ids
  alb_security_group_id   = module.networking.alb_security_group_id
  target_group_arn        = module.networking.target_group_arn
  ecr_repository_url      = var.ecr_repository_url
  container_port          = 3000
  task_cpu                = "512"
  task_memory             = "1024"
  service_desired_count   = 1
  db_credentials_arn      = module.database.db_credentials_arn
}

module "frontend" {
  source = "../../modules/frontend"

  project_name  = var.project_name
  environment   = "dev"
}
```

## Best Practices

1. **State Management**:

    - Use remote state with S3 backend and DynamoDB state locking
    - Keep state files separate for each environment

2. **Secrets Management**:

    - Use AWS Secrets Manager for sensitive data
    - Never hardcode secrets in Terraform code or commit them to the repository

3. **Environment Isolation**:

    - Maintain complete separation between environments
    - Use environment-specific AWS accounts when possible

4. **Infrastructure Testing**:

    - Use terraform-validate and terraform-fmt in CI pipeline
    - Consider using Terratest for infrastructure testing

5. **Monitoring and Alerting**:

    - Set up CloudWatch alarms for key metrics
    - Configure alerts for application and infrastructure issues

6. **Cost Management**:

    - Use AWS Cost Explorer and Budgets
    - Tag all resources for cost allocation
    - Use spot instances for non-production environments where applicable

7. **Security**:

    - Follow the principle of least privilege for IAM roles
    - Use WAF for API protection
    - Enable CloudTrail for auditing

8. **Scalability**:
    - Configure auto-scaling for ECS services
    - Use parameter configuration to easily adjust capacity

## Conclusion

This infrastructure setup provides a robust, scalable, and secure environment for deploying the Teddy Tech Lead Challenge application. The Terraform-based approach allows for consistent infrastructure deployment across environments and enables infrastructure as code best practices.

The GitHub Actions-based CI/CD pipeline automates testing, building, and deployment, ensuring that changes are thoroughly validated before being applied to production.
