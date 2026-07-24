/** Runtime glyph characters for Letter / Number packs (no WebP). */

export interface GlyphDef {
  id: string;
  char: string;
}

/** glyphId is the displayed character itself (case-sensitive). */
export function resolveGlyph(glyphId: string): GlyphDef {
  const id = glyphId.length > 0 ? glyphId : "?";
  return { id, char: id };
}
