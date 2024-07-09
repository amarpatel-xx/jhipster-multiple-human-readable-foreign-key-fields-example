import { Component, inject, signal, OnInit, createNgModule, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { StateStorageService } from 'app/core/auth/state-storage.service';
import SharedModule from 'app/shared/shared.module';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

import { loadNavbarItems, loadTranslationModule } from 'app/core/microfrontend';
import ActiveMenuDirective from './active-menu.directive';
import NavbarItem from './navbar-item.model';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule, SharedModule, HasAnyAuthorityDirective, ActiveMenuDirective],
})
export default class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = signal(true);
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account = inject(AccountService).trackCurrentAccount();
  entitiesNavbarItems: NavbarItem[] = [];
  blogEntityNavbarItems: NavbarItem[] = [];
  storeEntityNavbarItems: NavbarItem[] = [];

  private loginService = inject(LoginService);
  private translateService = inject(TranslateService);
  private stateStorageService = inject(StateStorageService);
  private injector = inject(Injector);
  private accountService = inject(AccountService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  constructor() {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.loadMicrofrontendsEntities();
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

  toggleNavbar(): void {
    this.isNavbarCollapsed.update(isNavbarCollapsed => !isNavbarCollapsed);
  }

  loadMicrofrontendsEntities(): void {
    // Lazy load microfrontend entities.
    loadNavbarItems('blog').then(
      async items => {
        this.blogEntityNavbarItems = items;
        try {
          const LazyTranslationModule = await loadTranslationModule('blog');
          createNgModule(LazyTranslationModule, this.injector);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error loading blog translation module', error);
        }
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('Error loading blog entities', error);
      },
    );
    loadNavbarItems('store').then(
      async items => {
        this.storeEntityNavbarItems = items;
        try {
          const LazyTranslationModule = await loadTranslationModule('store');
          createNgModule(LazyTranslationModule, this.injector);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error loading store translation module', error);
        }
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('Error loading store entities', error);
      },
    );
  }
}
