/**
 * Future directions — categories under exploration, previewed on both the
 * home page and the About page from this single source.
 *
 * The data lives in `data/directions.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 *
 * IMPORTANT
 * Nothing here is an operating business, a completed investment or a
 * performance claim. Each entry is an exploration area with a working name.
 */

import data from "./data/directions.json";

export type DirectionStatus = "exploring" | "developing" | "selective" | "active";

export type Direction = {
  id: string;
  title: string;
  description: string;
  status: DirectionStatus;
  marketFocus: string;
};

export const directionsEyebrow = data.eyebrow;
export const directionsTitle = data.title;
export const directionsLede = data.lede;

export const directionStatusMeta = data.statusMeta as Record<
  DirectionStatus,
  { label: string; description: string }
>;

export const directions = data.items as Direction[];
