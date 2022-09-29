export function deepClone<T = any>(payload: T): T {
  return JSON.parse(JSON.stringify(payload)) as T;
}
