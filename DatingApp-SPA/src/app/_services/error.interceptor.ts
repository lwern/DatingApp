import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                // Special handling for 401 errors, otherwise not handled with the following code 
                if (error.status === 401) {#
                    return throwError(error.statusText);
                }

                // Get the Application-Error Header that was added via the Extension Class
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    // Application Erros are returned as they are given via the application
                    return throwError(applicationError);
                }
                const serverError = error.error;
                let modelStateErrors = '';
                // These are the API errors
                if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            // Add all the serverErrors to an array
                            modelStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                // Return either the modelStateErrors, the serverErrors or a generic Error Text
                return throwError(modelStateErrors || serverError || 'Server Error');
            }
        }));
    }
}

// Add this to the generic HTTP_INTERCEPTORS list
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
