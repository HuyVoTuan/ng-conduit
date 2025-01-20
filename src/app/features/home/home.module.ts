import { NgModule } from "@angular/core";
import { HomeRoutes } from "./home.routing";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { BannerModule } from "@app/shared/components";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, BannerModule, HomeRoutes],
})
export class HomeModule {}
