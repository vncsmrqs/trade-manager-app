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

export function validateEmail(email: string): boolean {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )?.length;
}

export function getEnumKeyByValue<T>(enumObject: T, value: T): string {
  const indexOf = Object.values(enumObject).indexOf(value as unknown as T);
  return Object.keys(enumObject)[indexOf];
}
