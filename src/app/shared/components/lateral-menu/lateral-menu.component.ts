import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/core/presentation/interfaces/user.interface';
import { AuthService } from '../../../core/presentation/services/authentication/auth.service';
import { MenuItem } from './models/menu-item';
import { menuItems } from './menu.items';
import { GlobalService } from 'src/app/core/presentation/services/global.service';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit{
  roles: Role;
  user: User;
  userData: User = {
    name: 'Brayssen',
    lastName: 'Torrejon',
    phone: '918273927',
    roles: {
      name: 'superadmin'
    }
  }
  constructor(
    private authService: AuthService,
    private globalService: GlobalService){
    this.roles = {
      name: ""
    }
    this.user = this.userData;
  }
  ngOnInit(): void {
    const storedRoles = this.globalService.getDataFromStorage<Role>('roles');
    this.roles = storedRoles ?? this.roles;
  }
  getMenuItems(): MenuItem[]{
    if(this.user && menuItems[this.user.roles.name]){
      return menuItems[this.user.roles.name];
    }
    /*if(this.roles && menuItems[this.roles.name]){
      return menuItems[this.roles.name];
    }*/
    return [];
  }

  handleMenuItemClick(menuItem: any): void {
    if (menuItem.label === 'Cerrar Sesión') {
      this.authService.logout();
    }
  }
}
