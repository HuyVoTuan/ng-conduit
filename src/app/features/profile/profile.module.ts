import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileRoutes } from "./profile.routing";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { BannerModule } from "@app/shared/components";
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [UserProfileComponent, UserUpdateComponent],
  imports: [CommonModule, BannerModule, ProfileRoutes],
})
export class ProfileModule {}
