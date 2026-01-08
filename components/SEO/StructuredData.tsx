import { generateStructuredData } from '@/lib/seo';

export default function StructuredData() {
  const schemas = generateStructuredData();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}

