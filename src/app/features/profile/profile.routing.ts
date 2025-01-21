import { Routes, RouterModule } from "@angular/router";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserUpdateComponent } from "./user-update/user-update.component";

const routes: Routes = [
  {
    path: ":slug",
    component: UserProfileComponent,
    data: { title: "Profile" },
  },
  {
    path: ":slug/settings",
    component: UserUpdateComponent,
    data: { title: "Settings" },
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
