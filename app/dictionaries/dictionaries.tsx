import 'server-only'
import { Language } from '@/app/definitions';
 
const dictionaries = {
  en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
  vi: () => import('@/app/dictionaries/vi.json').then((module) => module.default),
}

export const getDictionary = async (lang: Language) => {
  return dictionaries[lang]();
};