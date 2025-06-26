// src/routes/sitemap.xml/+server.js
export const GET = async () => {
  const base = 'https://examfiles.net'; // Replace with your domain

  // Example: List of static pages
  const staticPages = ['/', '/aboutme', '/darkmode', '/darkmode/aboutme'].map((path) => ({
    loc: `${base}${path}`,
    lastmod: new Date().toISOString()
  }));


  const pages = [...staticPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
