export function uToMilliseconds(dateString: string): number {
  return new Date(dateString).getTime();
}
