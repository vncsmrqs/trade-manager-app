export function deepClone<T = any>(payload: T): T {
  return JSON.parse(JSON.stringify(payload)) as T;
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const results = [];

  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }

  return results;
}
