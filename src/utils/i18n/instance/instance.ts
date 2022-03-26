import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nHttpMiddleware from 'i18next-http-middleware';

const i18nInitOptions: InitOptions = {
  debug: true,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  nonExplicitSupportedLngs: true,
  backend: {
    loadPath: 'src/utils/locales/{{lng}}/translation.json',
  },
};

i18n
  .use(Backend)
  .use(i18nHttpMiddleware.LanguageDetector)
  .init(i18nInitOptions);

export default i18n;
