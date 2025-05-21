resource "aws_db_instance" "postgres" {
  identifier              = local.resource_names.postgres_db
  engine                  = "postgres"
  engine_version          = "14"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  publicly_accessible     = true
  skip_final_snapshot     = true
  deletion_protection     = false
  backup_retention_period = 1
  backup_window           = "03:00-04:00"
  maintenance_window      = "mon:04:00-mon:05:00"
  storage_encrypted       = false
  db_subnet_group_name    = null
  vpc_security_group_ids  = [aws_security_group.postgres.id]

  tags = local.resource_tags.database
} 