import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { englishTranslation, spanishTranslation } from './translations'

i18n
	.use(initReactI18next)
	.init({
    resources: {
      en: {
        translation: englishTranslation
      },
      es: {
        translation: spanishTranslation
      },
    },
		lng: localStorage.getItem('language') || "es",
		fallbackLng: "es",
		interpolation: {
			escapeValue: false
		}
	})

export default i18n;