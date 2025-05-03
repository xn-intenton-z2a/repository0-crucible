import { fileURLToPath } from "url";
import http from "http";
import readline from "readline";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import chalk from "chalk";
import express from "express";
import pkg from '../../package.json' assert { type: 'json' };

export const version = pkg.version;

// Built-in emoticon list
const BUILTIN_EMOTICONS = [
  ":)",
  ":-([",