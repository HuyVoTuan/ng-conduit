import { NgModule } from "@angular/core";
import { AuthGuard, NonAuthGuard } from "@app/core/guards";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [NonAuthGuard],
  },
  {
    path: "editor",
    loadChildren: () =>
      import("./features/editor/editor.module").then((m) => m.EditorModule),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./features/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
