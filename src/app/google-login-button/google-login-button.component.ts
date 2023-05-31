import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.scss']
})
export class GoogleLoginButtonComponent {

  @Output() googleLoginOutput= new EventEmitter<any>();
  @Output() hideButton = new EventEmitter<boolean>();

  clientID:string ="";
  hideGoogleButton:boolean = true;
  errorMessage: any;


  ngOnInit(): void {

  }

  addGoogleLogin(){
    this.googleLoginButtonRender();
  }


  googleLoginButtonRender(){
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.clientID,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });

    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {
      let message = notification.getNotDisplayedReason();
      if(message){
        this.errorMessage = message;
        this.hideButton.emit(true);
        this.hideGoogleButton = true;
      } else {
        this.errorMessage  = "";
        this.hideGoogleButton = false;
        setTimeout(()=>{
          let el = document.getElementById("google-button");
          // @ts-ignore
          google.accounts.id.renderButton(
          document.getElementById("google-button"),
            { theme: "outline", size: "large", width: el?.offsetWidth }
          );
        })
      }
    })

    window.addEventListener("resize", ()=>{
      let el = document.getElementById("google-button");
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
        document.getElementById("google-button"),
          { theme: "outline", size: "large", width: el?.offsetWidth  }
        );
      })

  }

  async handleCredentialResponse(response: any) {
    const data = this.parseJwt(response.token);
    this.googleLoginOutput.emit(response);
  }

  parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}
