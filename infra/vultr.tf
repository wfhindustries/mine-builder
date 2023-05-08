

resource "vultr_instance" "nomadcraft" {
  plan = "vc-1c-1gb"
  region = "sea"
  os_id = 167
}
