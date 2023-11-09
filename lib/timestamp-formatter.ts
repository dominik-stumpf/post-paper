export function formatPostDate(timestampTz: string) {
  return new Date(timestampTz).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
