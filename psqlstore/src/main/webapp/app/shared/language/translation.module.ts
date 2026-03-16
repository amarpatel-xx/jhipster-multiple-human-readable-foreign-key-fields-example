import { NgModule, inject } from '@angular/core';

import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { missingTranslationHandler } from 'app/config/translation.config';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: provideTranslateHttpLoader({ prefix: 'services/psqlstore/i18n/', suffix: `.json?_=${I18N_HASH}` }),
      isolate: false,
      extend: true,
    }),
  ],
})
export class LazyTranslationModule {
  private readonly translateService = inject(TranslateService);
  private readonly translateLoader = inject(TranslateLoader);
  private readonly stateStorageService = inject(StateStorageService);

  constructor() {
    const currentLang = this.translateService.getCurrentLang();
    this.translateLoader.getTranslation(currentLang).subscribe(translation => {
      this.translateService.setTranslation(currentLang, translation);
    });
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: `.json?_=${I18N_HASH}` }),
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
  ],
})
export class TranslationModule {
  private readonly translateService = inject(TranslateService);
  private readonly stateStorageService = inject(StateStorageService);

  constructor() {
    this.translateService.setFallbackLang('en');
    // if the user has changed the language and navigates away from the application and back to it, then use the previously chosen language
    const langKey = this.stateStorageService.getLocale() ?? 'en';
    this.translateService.use(langKey);
  }
}
