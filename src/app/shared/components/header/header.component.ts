import {
  Component,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
} from "@angular/core";
import {
  NavMenu,
  AUTH_NAV_MENU,
  NON_AUTH_NAV_MENU,
  MOBILE_AUTH_NAV_MENU,
  MOBILE_NON_AUTH_NAV_MENU,
} from "@app/shared/constants";
import { takeUntil } from "rxjs/operators";
import { AuthStore } from "@app/shared/store";
import { AuthUserDto } from "@app/shared/models";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";

@Component({
  selector: "conduit-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy, OnInit {
  @HostListener("window:resize")
  onResize(): void {
    this.checkScreenSize();
  }

  private destroy$ = new Subject<void>();

  navMenu: NavMenu[] = [];
  currentUser: AuthUserDto | null = null;
  isMobileScreen$ = new BehaviorSubject<boolean>(false);

  constructor(private authStore: AuthStore) {}

  ngOnInit(): void {
    this.initializeNavMenuUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeNavMenuUpdates(): void {
    combineLatest([this.authStore.currentUser$, this.isMobileScreen$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([currentUser, isMobileScreen]) => {
        this.currentUser = currentUser;
        this.navMenu = this.buildNavMenu(isMobileScreen, currentUser);
      });
  }

  private buildNavMenu(
    isMobileScreen: boolean,
    currentUser: AuthUserDto | null
  ): NavMenu[] {
    const baseMenu = isMobileScreen
      ? currentUser
        ? [...MOBILE_AUTH_NAV_MENU]
        : MOBILE_NON_AUTH_NAV_MENU
      : currentUser
      ? [...AUTH_NAV_MENU]
      : NON_AUTH_NAV_MENU;

    if (!currentUser || !Array.isArray(baseMenu)) {
      return baseMenu;
    }

    return this.customizeAuthMenu(baseMenu, currentUser);
  }

  private customizeAuthMenu(
    navMenu: NavMenu[],
    currentUser: AuthUserDto
  ): NavMenu[] {
    const slug = currentUser?.data?.slug;

    // Update the profile item in the nav menu for desktop and mobile
    navMenu.forEach((item) => {
      if (item.subNav) {
        item.label = slug;
        item.subNav.forEach((subItem) => {
          if (subItem.url?.includes("/:slug")) {
            subItem.url = subItem.url.replace(":slug", slug);
          }
        });
      }

      if (item.url?.includes("/:slug")) {
        item.url = item.url.replace(":slug", slug);
      }
    });

    // Update logout functionality if present
    const logoutItem = navMenu.find((item) =>
      item.subNav?.some((subItem) => subItem.label === "Sign Out")
    );

    if (logoutItem) {
      const logoutSubItem = logoutItem.subNav!.find(
        (subItem) => subItem.label === "Sign Out"
      );
      if (logoutSubItem) {
        logoutSubItem.func = () => this.authStore.signout();
      }
    }

    return navMenu;
  }

  private checkScreenSize(): void {
    this.isMobileScreen$.next(window.innerWidth <= 1024);
  }

  trackByFn(index: number, item: NavMenu): string {
    return item.url || item.label;
  }
}
