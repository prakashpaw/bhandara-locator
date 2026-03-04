variable "aws_region" {
  default = "ap-south-1"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_name" {
  default = "bhandara-key"
}

variable "db_password" {
  default   = "postgres123"
  sensitive = true
}