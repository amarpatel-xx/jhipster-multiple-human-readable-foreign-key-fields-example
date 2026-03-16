import { Component, Injector, OnInit, createNgModule, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { environment } from 'environments/environment';
import { LANGUAGES } from 'app/config/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { loadNavbarItems, loadTranslationModule } from 'app/core/microfrontend';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LoginService } from 'app/login/login.service';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';
import { TranslateDirective } from 'app/shared/language';
import FindLanguageFromKeyPipe from 'app/shared/language/find-language-from-key.pipe';

import ActiveMenuDirective from './active-menu.directive';
import NavbarItem from './navbar-item.model';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    NgbCollapse,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    HasAnyAuthorityDirective,
    ActiveMenuDirective,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    TranslateModule,
  ],
})
export default class Navbar implements OnInit {
  readonly inProduction = signal(true);
  readonly isNavbarCollapsed = signal(true);
  readonly languages = LANGUAGES;
  readonly openAPIEnabled = signal(false);
  readonly version: string;
  readonly account = inject(AccountService).account;
  entitiesNavbarItems: NavbarItem[] = [];
  psqlblogEntityNavbarItems = signal<NavbarItem[]>([]);
  psqlstoreEntityNavbarItems = signal<NavbarItem[]>([]);

  private readonly loginService = inject(LoginService);
  private readonly translateService = inject(TranslateService);
  private readonly stateStorageService = inject(StateStorageService);
  private readonly injector = inject(Injector);
  private readonly accountService = inject(AccountService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  constructor() {
    const { VERSION } = environment;
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    } else {
      this.version = '';
    }

    effect(() => {
      if (this.accountService.account()) {
        this.loadMicrofrontendsEntities();
      }
    });
  }

  ngOnInit(): void {
    // Saathratri modification - sort entity navbar items alphabetically
    this.entitiesNavbarItems = [...EntityNavbarItems].sort((a, b) => a.name.localeCompare(b.name));
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction.set(profileInfo.inProduction ?? true);
      this.openAPIEnabled.set(profileInfo.openAPIEnabled ?? false);
    });
  }

  changeLanguage(languageKey: string): void {
    this.stateStorageService.storeLocale(languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed.set(true);
  }

  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  // Saathratri modification - alphabetical sorting helper
  private sortNavbarItemsAlphabetically(items: NavbarItem[]): NavbarItem[] {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }

  loadMicrofrontendsEntities(): void {
    // Lazy load microfrontend entities.
    loadNavbarItems('psqlblog').then(
      async items => {
        this.psqlblogEntityNavbarItems.set(this.sortNavbarItemsAlphabetically(items));
        try {
          const LazyTranslationModule = await loadTranslationModule('psqlblog');
          createNgModule(LazyTranslationModule, this.injector);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error loading psqlblog translation module', error);
        }
      },
      (error: unknown) => {
        // eslint-disable-next-line no-console
        console.log('Error loading psqlblog entities', error);
      },
    );
    loadNavbarItems('psqlstore').then(
      async items => {
        this.psqlstoreEntityNavbarItems.set(this.sortNavbarItemsAlphabetically(items));
        try {
          const LazyTranslationModule = await loadTranslationModule('psqlstore');
          createNgModule(LazyTranslationModule, this.injector);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error loading psqlstore translation module', error);
        }
      },
      (error: unknown) => {
        // eslint-disable-next-line no-console
        console.log('Error loading psqlstore entities', error);
      },
    );
  }
}
