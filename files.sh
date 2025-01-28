#!/bin/bash

# Exclude directories and list all files with the project structure
find . \
  -path "./node_modules" -prune -o \
  -path "./.vscode" -prune -o \
  -type f -print -o -type d -print | sort
