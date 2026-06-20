import type { Locale } from '../locales';
import type { Messages } from './en';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { uk } from './uk';
import { ru } from './ru';

export const dictionaries: Record<Locale, Messages> = { en, es, de, uk, ru };
export type { Messages };
