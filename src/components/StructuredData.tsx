/**
 * Renders a Schema.org JSON-LD block. Google reads `application/ld+json`
 * anywhere in the document, so rendering it inline inside the page is fine.
 */

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the closing-tag sequence only.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
