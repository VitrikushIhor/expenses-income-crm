import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {IAuthUser, IUser} from '../types/types';
import {API_URL} from '../constants/url';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr'; // добавлено

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthSig = signal<boolean>(false)

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    const token = localStorage.getItem("token");
    this.isAuthSig.set(!!token)
  }

  signUp(userData: IAuthUser) {
    return this.http.post<IUser>(`${API_URL}/user/registration`, userData)
      .pipe(
        tap(()=>{
          this.login(userData)
        }),
        catchError((error) => {
          this.handleError(error);
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.toastr.success('Success Created');
      });
  }

  login(userData: IAuthUser) {
    return this.http.post<IUser>(`${API_URL}/auth/login`, userData)
      .pipe(
        tap((res: IUser) => {
          localStorage.setItem('token', res.token);
          this.isAuthSig.set(true)
          catchError((error) => {
            this.handleError(error);
            throw new Error(error);
          })
        })
      )
      .subscribe(() => {
        this.toastr.success('Login Success');
        this.router.navigate(["/home"])
      });
  }

  logOut(){
    localStorage.removeItem('token')
    this.isAuthSig.set(false)
    this.router.navigate(["/login"])
    this.toastr.success("Successfully logged out")
  }

  private handleError(error: HttpErrorResponse): void {
    this.toastr.error(error.error.message);
  }
}
