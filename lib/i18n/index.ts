import { en } from "./en";
import { ar } from "./ar";
import type { Lang } from "./types";
import type { Dict } from "./en";

export { en, ar };
export type { Lang } from "./types";
export type { Dict } from "./en";

export const dictionaries: Record<Lang, Dict> = { en, ar };
