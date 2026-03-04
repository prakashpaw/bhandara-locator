output "manager_public_ip" {
  value = aws_instance.swarm_manager.public_ip
}

output "worker_1_public_ip" {
  value = aws_instance.swarm_worker_1.public_ip
}

output "worker_2_public_ip" {
  value = aws_instance.swarm_worker_2.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}