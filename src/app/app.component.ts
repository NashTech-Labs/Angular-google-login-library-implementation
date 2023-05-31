import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-google-login-library-implementation';

  constructor(){
    let script = document.createElement('script');
    script.src =  "https://accounts.google.com/gsi/client";
    script.defer = true;
    script.async = true;
    document.head.append(script);
  }

}
