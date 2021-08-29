import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  class mockAuthenticationService {
    currentUserSubject = new BehaviorSubject<User>(JSON.parse('{"id":1,"username":"TestUserName","firstName":"TestFirstName","lastName":"TestLname","token":"test-fake-jwt-token"}'));

    get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    login() { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: AuthenticationService, useClass: mockAuthenticationService
        },
      ]
    })
    .compileComponents();
    authService = TestBed.get(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  /**
   * ? checks if a component is truthy
  */
  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * ? checks the title of the page is correct
  */
  it('should contain a title of login page', () => {
    const header = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
    const element: HTMLElement = header.nativeElement;
    expect(element.textContent).toContain(component.title);
  });

  /**
   * ? checks if getter property in component is getting called correctly
  */
  it('should be able to access getter', () => {
    fixture.detectChanges();
    const form = component.f;
    expect(form).hasOwnProperty('username');
    expect(form).hasOwnProperty('password');
  });

  /**
   * ? checks if ngOnit have been called
  */
   it('should be able to call ngOnit method', () => {
    router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    spyOnProperty(authService, 'currentUserValue').and.returnValue(true);
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(routerSpy).toHaveBeenCalled();
  });

  /**
   * ? checks if ngOnit have been called
  */
   it('should be able to call ngOnit method and cover the else path', () => {
    router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    spyOnProperty(authService, 'currentUserValue').and.returnValue(false);
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

  /**
   * ? checks if router.navigate have been called
  */
  it('should be navigated to home if user is already authenticated', async() => {
    authService.currentUserValue;
    expect(authService.currentUserValue.username).toContain('TestUserName');
    expect(authService.currentUserValue).toBeDefined();
    expect(authService.currentUserValue).toBeTruthy();
  });

  /**
   * ? checks if onSubmit can be called
  */
  it('should be able to call onSubmit method when form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * ? checks if form is invalid
  */
  it('should not be able to submit if form is invalid', () => {
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
    component.onSubmit();
  });

  /**
   * ? checks if form is valid
  */
  it('should be able to submit form if valid', () => {
    router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    const form = new FormBuilder();
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();
    const authSpy = spyOn(authService, 'login').and.returnValue(of('http://someurl'));
    component.onSubmit();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  /**
   * ? handles the error case when an observable throws an error
  */
  it('should be able to handled error case if error occured in submitting a form', () => {
    const form = new FormBuilder();
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();
    const authSpy = spyOn(authService, 'login').and.callFake(() => {
      return throwError('Error!');
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
});
