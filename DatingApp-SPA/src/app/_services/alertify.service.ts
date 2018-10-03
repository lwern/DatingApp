import { Injectable } from '@angular/core';
// Lets the alertify object be used in the class, alertify is available globally after importing it in the scripts
declare let alertify: any;

// The reason for this class is to wrap the alertify methods in a seperate service
// This way you decouple the external 3rd party code from your own
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
