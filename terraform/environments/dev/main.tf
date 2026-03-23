terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "frontend_ecr" {
  source = "../../modules/ecr"

  repository_name = var.frontend_repository_name
}

module "backend_ecr" {
  source = "../../modules/ecr"

  repository_name = var.backend_repository_name
}