/**
 * Minimal shape required by makeInputId. Decoupled from any app-specific
 * Field/Choice model — only a `slug` string is needed.
 */
interface Sluggable {
  slug: string;
}

export default function makeInputId(
  idPrefix: string,
  field: Sluggable,
  choice?: Sluggable,
) {
  const parts = [];

  if (idPrefix) {
    parts.push(idPrefix);
  }
  parts.push(field.slug);
  if (choice) {
    parts.push(choice.slug);
  }

  return parts.join("-");
}
