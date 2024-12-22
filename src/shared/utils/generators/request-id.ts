import { randomUUID } from 'node:crypto';

export function randomRequestId() {
  return `request_${randomUUID().replaceAll('-', '')}`;
}
