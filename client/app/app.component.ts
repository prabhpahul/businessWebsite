import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  constructor(public auth: AuthService) { }
   private _opened: boolean = false;
 
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  value:string = "click me";

}
