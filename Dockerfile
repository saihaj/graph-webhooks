# Base image
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /app

COPY . .

RUN apt update \
  && apt install -y curl dumb-init gosu \
  && rm -rf /var/lib/apt/lists/*
