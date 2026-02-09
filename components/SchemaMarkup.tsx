"use client";

import { usePathname } from "next/navigation";
import { getSchemasForPage } from "@/lib/schema";

interface SchemaMarkupProps {
  pathname?: string;
  customSchemas?: object[];
}

export default function SchemaMarkup({ pathname, customSchemas }: SchemaMarkupProps) {
  const currentPath = usePathname();
  const schemas = getSchemasForPage(pathname || currentPath || "/");

  if (customSchemas) {
    schemas.push(...customSchemas);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
