import type { Timestamp } from "@bufbuild/protobuf/wkt";
/**
 * Convierte un objeto Timestamp de protobuf (google.protobuf.Timestamp)
 * a un objeto `Date` de JavaScript.
 *
 * @remarks
 * - Si `timestamp` o `timestamp.seconds` vienen `undefined`, se retorna `undefined`.
 * - `seconds` puede venir como `number`, `string` o `bigint`.
 * - `nanos` representa nanosegundos adicionales (opcional).
 *
 * @param timestamp - Objeto timestamp con `seconds` y opcionalmente `nanos`.
 * @returns Instancia `Date` o `undefined` si el timestamp no es válido.
 *
 * @example
 * ```ts
 * const ts = { seconds: 1699476294n, nanos: 500000000 };
 * const date = timestampToDate(ts);
 * console.log(date?.toISOString());
 *
 * const emptyDate = timestampToDate(undefined);
 * console.log(emptyDate); // undefined
 * ```
 */
export const timestampToDate = (
  timestamp?: Timestamp
): Date | undefined => {

  // Si no viene timestamp o no trae seconds → no se puede convertir
  if (!timestamp || timestamp.seconds === undefined || timestamp.seconds === null) {
    return undefined;
  }

  // Convertimos seconds a number
  const seconds = Number(timestamp.seconds);

  // nanos → milisegundos (ns / 1,000,000)
  const millis = seconds * 1000 + Math.floor((timestamp.nanos ?? 0) / 1e6);

  return new Date(millis);
};
