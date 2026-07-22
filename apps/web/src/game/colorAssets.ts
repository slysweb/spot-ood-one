/** CSS swatch fills for the Color medium pack. */

export interface ColorSwatch {
  id: string;
  fill: string;
  /** Optional hatch pattern key for future colorblind assist */
  pattern?: string;
}

const SWATCHES: Record<string, ColorSwatch> = {
  RED: { id: "RED", fill: "#E53935", pattern: "solid" },
  RED_DARK: { id: "RED_DARK", fill: "#B71C1C", pattern: "solid" },
  RED_LIGHT: { id: "RED_LIGHT", fill: "#EF9A9A", pattern: "solid" },
  RED_SOFT: { id: "RED_SOFT", fill: "#D32F2F", pattern: "solid" },
  ORANGE: { id: "ORANGE", fill: "#FB8C00", pattern: "solid" },
  ORANGE_DARK: { id: "ORANGE_DARK", fill: "#E65100", pattern: "solid" },
  ORANGE_NEAR: { id: "ORANGE_NEAR", fill: "#F4511E", pattern: "solid" },
  ORANGE_GRAD: {
    id: "ORANGE_GRAD",
    fill: "linear-gradient(135deg, #FB8C00 0%, #FFD54F 100%)",
    pattern: "grad",
  },
  YELLOW: { id: "YELLOW", fill: "#FDD835", pattern: "solid" },
  YELLOW_DARK: { id: "YELLOW_DARK", fill: "#F9A825", pattern: "solid" },
  LIME: { id: "LIME", fill: "#C0CA33", pattern: "solid" },
  GREEN: { id: "GREEN", fill: "#43A047", pattern: "solid" },
  GREEN_LIGHT: { id: "GREEN_LIGHT", fill: "#81C784", pattern: "solid" },
  GREEN_GRAD: {
    id: "GREEN_GRAD",
    fill: "linear-gradient(135deg, #43A047 0%, #C5E1A5 100%)",
    pattern: "grad",
  },
  TEAL: { id: "TEAL", fill: "#00897B", pattern: "solid" },
  TEAL_DESAT: { id: "TEAL_DESAT", fill: "#4DB6AC", pattern: "solid" },
  TEAL_GRAD: {
    id: "TEAL_GRAD",
    fill: "linear-gradient(145deg, #00897B 10%, #4DD0E1 90%)",
    pattern: "grad",
  },
  CYAN: { id: "CYAN", fill: "#00ACC1", pattern: "solid" },
  CYAN_NEAR: { id: "CYAN_NEAR", fill: "#26C6DA", pattern: "solid" },
  BLUE: { id: "BLUE", fill: "#1E88E5", pattern: "solid" },
  BLUE_DARK: { id: "BLUE_DARK", fill: "#1565C0", pattern: "solid" },
  BLUE_DESAT: { id: "BLUE_DESAT", fill: "#90CAF9", pattern: "solid" },
  BLUE_SOFT: { id: "BLUE_SOFT", fill: "#1976D2", pattern: "solid" },
  PURPLE: { id: "PURPLE", fill: "#8E24AA", pattern: "solid" },
  PURPLE_LIGHT: { id: "PURPLE_LIGHT", fill: "#BA68C8", pattern: "solid" },
  PURPLE_GRAD: {
    id: "PURPLE_GRAD",
    fill: "linear-gradient(135deg, #8E24AA 0%, #CE93D8 100%)",
    pattern: "grad",
  },
  PINK: { id: "PINK", fill: "#EC407A", pattern: "solid" },
  PINK_DESAT: { id: "PINK_DESAT", fill: "#F48FB1", pattern: "solid" },
};

export function resolveColorSwatch(colorId: string): ColorSwatch {
  const key = colorId.toUpperCase();
  return SWATCHES[key] ?? SWATCHES.RED;
}

export function colorPreviewFill(colorId: string): string {
  return resolveColorSwatch(colorId).fill;
}
