import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FakeAuthService } from '../../../auth/services/fake-auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(
    private router: Router,
    private fakeAuthService: FakeAuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  currentRoute = '';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.fakeAuthService.isLoggedIn()
          .then((isLoggedIn) => {
            this.isAuth = isLoggedIn;
            this.cdr.markForCheck();
          });
      }
    });
  }

  logout() {
    this.fakeAuthService.logout();
    this.router.navigate(['/login']);
    this.isAuth = false;
  }

}
