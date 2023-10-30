export function toCase(doc) {
  return { id: doc.id, ...doc.data() };
}
