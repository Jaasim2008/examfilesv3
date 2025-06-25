// place files you want to import through the `$lib` alias in this folder.

/**
 * Extracts the filename from a URL.
 * @param url - The full URL string.
 * @returns The filename (last part after `/`)
 */
export function getFilename(url: string): string {
  return url.split('/').pop() ?? '';
}
