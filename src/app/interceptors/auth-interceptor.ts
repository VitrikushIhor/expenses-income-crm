import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {API_URL} from '../constants/url';

export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>,
            next: HttpHandler) {
    const token = localStorage.getItem("token")
    if (token) {
      req= req.clone({
        setHeaders:{
           Authorization:`Bearer ${token}`
        },
        url:`${API_URL}/${req.url}`
      })
    }
    return next.handle(req)
  }

}
