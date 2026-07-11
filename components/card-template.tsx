"use client";

import { forwardRef, useImperativeHandle } from "react";

export type CardVariant = "dark" | "light";

interface CardTemplateProps {
  userName: string;
  variant: CardVariant;
  onTextureReady: (dataUrl: string) => void;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
  exportCard: () => void;
}

// Matches the new artwork's actual pixel size (1254x1254) — NOT the old
// hand-drawn canvas's 1376x1376. If you ever swap in a different-sized PNG,
// update this to its exact dimensions or the texture will stretch oddly.
const CANVAS_SIZE = 1254;

// Same ~24.3% ratio the old canvas used for CROP_BOTTOM: this is the strip
// at the bottom of ANY texture on this card model that's physically covered
// by the lanyard clip attachment in the 3D scene — invisible on the actual
// card, not just cropped from the downloaded PNG.
// On your new artwork this puts the visible boundary at y≈950. The blank
// space right under the "ATTENDEE PASS" divider line (y≈1030+) is PAST that
// boundary and would be hidden by the clip — so the name is placed higher up
// instead, in the blank gap between the chevron pattern and "ATTENDEE PASS"
// (y≈875–935), which is fully visible.
const CROP_BOTTOM = Math.round(CANVAS_SIZE * (334 / 1376)); // ≈ 304

// Right-aligned to x=650 to sit inside the front-face-visible column (the
// model only shows roughly the left half of this square texture on the
// card's front — the right side, where your university-logo footer sits,
// maps to the back face) and in line with the chevron pattern's right edge.
const NAME_X = 650;
const NAME_Y = 905;

const BG_IMAGE_SRC: Record<CardVariant, string> = {
  dark: "/card-bg-dark.png",
  // TODO: swap in a real light-mode version once you have one — for now
  // both variants render the same dark artwork so the toggle doesn't break.
  light: "/card-bg-dark.png",
};

// Cache decoded images so repeated captureTexture()/exportCard() calls
// (every keystroke's "Apply", initial mount, etc.) don't re-fetch/decode.
const imageCache = new Map<string, HTMLImageElement>();

async function loadBackgroundImage(variant: CardVariant): Promise<HTMLImageElement> {
  const src = BG_IMAGE_SRC[variant];
  const cached = imageCache.get(src);
  if (cached) return cached;

  const img = new Image();
  img.src = src;
  await img.decode();
  imageCache.set(src, img);
  return img;
}

async function drawCard(
  ctx: CanvasRenderingContext2D,
  variant: CardVariant,
  userName: string
) {
  const bgImage = await loadBackgroundImage(variant);
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.drawImage(bgImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const displayName = (userName || "YOUR NAME").toUpperCase();
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = 'normal 52px "Geist Mono", monospace';
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(displayName, NAME_X, NAME_Y);
  ctx.restore();
}

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, variant, onTextureReady }, ref) => {
    const captureTexture = async () => {
      if (typeof document !== "undefined" && "fonts" in document) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font-loading errors, fall back to default font metrics
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      await drawCard(ctx, variant, userName);

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    const exportCard = async () => {
      const EXPORT_HEIGHT = CANVAS_SIZE - CROP_BOTTOM;

      const fullCanvas = document.createElement("canvas");
      fullCanvas.width = CANVAS_SIZE;
      fullCanvas.height = CANVAS_SIZE;
      const fullCtx = fullCanvas.getContext("2d");
      if (!fullCtx) return;

      await drawCard(fullCtx, variant, userName);

      // Crop out the bottom section (hidden behind the lanyard clip in 3D).
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = CANVAS_SIZE;
      exportCanvas.height = EXPORT_HEIGHT;
      const exportCtx = exportCanvas.getContext("2d");
      if (!exportCtx) return;

      exportCtx.drawImage(
        fullCanvas,
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT,
        0, 0, CANVAS_SIZE, EXPORT_HEIGHT
      );

      const dataUrl = exportCanvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `global-sdg-ai-hackathon-${userName || "card"}.png`;
      link.href = dataUrl;
      link.click();
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
      exportCard,
    }));

    // This component doesn't render anything visible — it's a texture generator.
    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;