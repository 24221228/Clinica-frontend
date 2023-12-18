import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Login, Person } from 'src/app/core/presentation/interfaces/login.interface';
import { GlobalService } from 'src/app/core/presentation/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  routeName: string ="";
  personData: Person | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeName = this.route.snapshot.data["routeName"];
      }
    });

  }
  ngOnInit() {
    //this.userData = this.globalService.getDataFromStorage<string>('correo_electronico') || "";
    
    this.personData = this.globalService.getDataFromStorage<Person[]>('person')?.[0];
    this.routeName = this.route.snapshot.data["routeName"];
  }
}
