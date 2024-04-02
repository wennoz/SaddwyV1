import { Component, OnInit } from '@angular/core';
import { TokenRefreshService } from './Core/token-refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SaddWy';
  constructor(private refreshToken:TokenRefreshService){}
  ngOnInit(): void {
    this.refreshToken.startTokenRefresh();
  }
}
