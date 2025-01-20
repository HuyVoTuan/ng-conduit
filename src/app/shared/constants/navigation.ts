export type NavMenu = {
  url?: string;
  label: string;
  icon?: string;
  subNav?: NavMenu[];
} & { func?: () => void };

export const NON_AUTH_NAV_MENU: NavMenu[] = [
  {
    url: "/",
    label: "Home",
    icon: "fa-solid fa-house",
  },
  {
    url: "/auth/sign-in",
    label: "Sign In",
    icon: "fa-solid fa-right-to-bracket",
  },
  {
    url: "/auth/sign-up",
    label: "Sign Up",
    icon: "fa-solid fa-user-plus",
  },
];

export const AUTH_NAV_MENU: NavMenu[] = [
  {
    url: "/",
    label: "Home",
    icon: "fa-solid fa-house",
  },
  {
    url: "editor",
    label: "New Article",
    icon: "fa-solid fa-pen-to-square",
  },
  {
    icon: "fa-solid fa-user-circle",
    label: "Settings",
    subNav: [
      {
        // Dynamic URL binding in header.component.ts
        url: "profile/:slug",
        label: "Profile",
        icon: "fa-solid fa-user",
      },
      {
        url: "profile/:slug/settings",
        label: "Settings",
        icon: "fa-solid fa-gear",
      },
      {
        url: "/auth/sign-out",
        label: "Sign Out",
        icon: "fa-solid fa-sign-out",
        func: () => {},
      },
    ],
  },
];

export const MOBILE_NON_AUTH_NAV_MENU: NavMenu[] = NON_AUTH_NAV_MENU;
export const MOBILE_AUTH_NAV_MENU: NavMenu[] = [
  {
    url: "/",
    label: "Home",
    icon: "fa-solid fa-house",
  },
  {
    url: "editor",
    label: "New Article",
    icon: "fa-solid fa-pen-to-square",
  },
  {
    // Dynamic URL binding in header.component.ts
    url: "profile/:slug",
    label: "Profile",
    icon: "fa-solid fa-user",
  },
];
