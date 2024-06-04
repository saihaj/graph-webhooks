variable "RELEASE" {
  default = "dev"
}

variable "BASE_IMAGE" {}

variable "PWD" {
  default = "."
}

variable "DOCKER_REGISTRY" {
  default = ""
}

variable "COMMIT_SHA" {
  default = ""
}

variable "BRANCH_NAME" {
  default = ""
}

variable "BUILD_TYPE" {
  # Can be "", "ci" or "publish"
  default = ""
}

variable "BUILD_STABLE" {
  # Can be "" or "1"
  default = ""
}

function "get_target" {
  params = []
  result = notequal("", BUILD_TYPE) ? notequal("ci", BUILD_TYPE) ? "target-publish" : "target-ci" : "target-dev"
}

function "local_image_tag" {
  params = [name]
  result = equal("", BUILD_TYPE) ? "${DOCKER_REGISTRY}${name}:latest" : ""
}

function "stable_image_tag" {
  params = [name]
  result = equal("1", BUILD_STABLE) ? "${DOCKER_REGISTRY}${name}:latest" : ""
}

function "image_tag" {
  params = [name, tag]
  result = notequal("", tag) ? "${DOCKER_REGISTRY}${name}:${tag}" : ""
}

target "service-base" {
  dockerfile = "${PWD}/docker/services.dockerfile"
  args = {
    RELEASE = "${RELEASE}"
    BASE_IMAGE = "${BASE_IMAGE}"
  }
}

target "target-dev" {}

target "target-ci" {
  cache-from = ["type=gha"]
  cache-to = ["type=gha,mode=max"]
}

target "target-publish" {
  platforms = ["linux/amd64", "linux/arm64"]
  cache-from = ["type=gha"]
  cache-to = ["type=gha,mode=max"]
}

target "substream-listener" {
  inherits = ["service-base", get_target()]
  context = "${PWD}/substream-listener"
  args = {
    IMAGE_TITLE = "graph-webhooks/substream-listener"
    IMAGE_DESCRIPTION = "Substream listener for the Graph Webhook service"
    PORT = "4040"
    HEALTHCHECK_CMD = "curl -f http://127.0.0.1:$${PORT}/health || exit 1"
    SERVICE_NAME = "substream-listener"
  }
  tags = [
    local_image_tag("substream-listener"),
    stable_image_tag("substream-listener"),
    image_tag("substream-listener", COMMIT_SHA),
    image_tag("substream-listener", BRANCH_NAME)
  ]
}

group "build" {
  targets = [
    "substream-listener"
  ]
}
