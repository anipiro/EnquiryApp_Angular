import { Component } from "@angular/core";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    imports: [RouterOutlet,RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ["./app.css"],
})
export class AppComponent {
    title = "EnquiryApp_Angular19";
}