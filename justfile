#!/usr/bin/env just --justfile

# List available recipes
default:
  @just --list

check-reqs:
  app/scripts/check_requirements

install:
  @git lfs install
  @git lfs pull
  @app/scripts/fetch_mar_tools
  @npm install

run:
  @app/scripts/build_and_run -r