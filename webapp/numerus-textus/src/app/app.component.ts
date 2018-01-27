import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mobileNavbarVisible = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
        if (!(routerEvent instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });
  }

  toggleMobileNavbar(): void {
    this.mobileNavbarVisible = !this.mobileNavbarVisible;
  }

  hideMobileNavbar(): void {
    this.mobileNavbarVisible = false;
  }
}
