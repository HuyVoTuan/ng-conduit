import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "codnuit-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
