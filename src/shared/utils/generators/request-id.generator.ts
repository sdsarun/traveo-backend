import { randomUUID } from 'node:crypto';

export function generateUniqueIdWithPrefix(prefix: string) {
  return prefix.concat("_", randomUUID().replaceAll("-", ""));
}

export function randomRequestId() {
  return generateUniqueIdWithPrefix("request");
}