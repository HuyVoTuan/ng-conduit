import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: { title: "Home" },
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
