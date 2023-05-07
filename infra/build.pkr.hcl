variable "vultr_api_key" {
  type    = string
  default = "${env("VULTR_API_KEY")}"
}

source "vultr" "ubuntu-20" {
  api_key              = "${var.vultr_api_key}"
  os_id                = "413"
  plan_id              = "vhf-1c-1gb"
  region_id            = "atl"
  snapshot_description = "testing"
  state_timeout        = "10m"
  ssh_username         = "root"
}

build {
  sources = ["source.vultr.ubuntu-20"]
}

