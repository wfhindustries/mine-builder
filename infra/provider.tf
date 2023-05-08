terraform {
  required_providers {
  vultr = {
    source = "vultr/vultr"
    version = "2.15.0"
}
  github = {
      source = "integrations/github"
      version = "5.25.0"
    }
}
}

variable "VULTR_API_KEY" {
  type = string
}

provider "vultr" {
  api_key = var.VULTR_API_KEY
  rate_limit = 100
  retry_limit = 3
}

provider "github" {

  }



