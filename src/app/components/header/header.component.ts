import {Component} from '@angular/core';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoutIcon = faArrowRightFromBracket

  constructor(public authService: AuthService) {
  }
  logOutHandler(){
    this.authService.logOut()
  }
}
