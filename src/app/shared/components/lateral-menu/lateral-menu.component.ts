import { Component } from '@angular/core';
import { User } from 'src/app/core/presentation/interfaces/user.interface';
import { AuthService } from '../../../core/presentation/services/authentication/auth.service';
import { MenuItem } from './models/menu-item';
import { menuItems } from './menu.items';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent {
  user: User;
  userData: User = {
    name: 'Brayssen',
    lastName: 'Torrejon',
    phone: '918273927',
    roles: {
      id: 1,
      name: 'superadmin'
    }
  }
  constructor(private authService: AuthService){
    this.user = this.userData;
  }
  getMenuItems(): MenuItem[]{
    if(this.user && menuItems[this.user.roles.name]){
      return menuItems[this.user.roles.name];
    }
    return [];
  }

  handleMenuItemClick(menuItem: any): void {
    if (menuItem.label === 'Cerrar Sesión') {
      this.authService.logout();
    }
  }
}
