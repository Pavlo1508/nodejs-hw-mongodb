// src/utils/getEnvVar.js

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export function getEnvVar(name, defaultValue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process.env['${name}'].`);
}

