/**
 * Encode a JavaScript object into a base64 string
 */
export function encodeBase64(obj: object | string | number): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

/**
 * Decode a base64 string into a JavaScript object
 */
export function decodeBase64<T>(str: string): T {
  return JSON.parse(Buffer.from(str, "base64").toString());
}
