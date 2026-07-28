/**
 * Minimal class-name joiner. Deliberately dependency-free — the component
 * system never needs conflict resolution because variants own their classes.
 */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
