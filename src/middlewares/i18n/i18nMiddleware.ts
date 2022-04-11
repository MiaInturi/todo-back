import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nHttpMiddleware from 'i18next-http-middleware';

const i18nInitOptions: InitOptions = {
  initImmediate: false,
  load: 'languageOnly',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  nonExplicitSupportedLngs: true,
  backend: {
    loadPath: 'src/utils/locales/{{lng}}/translation.json',
  },
};
i18n
  .use(i18nHttpMiddleware.LanguageDetector)
  .use(Backend)
  .init(i18nInitOptions);

export const i18nMiddleware = i18nHttpMiddleware.handle(i18n);
