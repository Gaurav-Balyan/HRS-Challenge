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

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  class mockAuthenticationService {
    currentUserSubject = new BehaviorSubject<User>(JSON.parse('{"id":1,"username":"TestUserName","firstName":"TestFirstName","lastName":"TestLname","token":"test-fake-jwt-token"}'));

    get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    login() {

    }
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
   it('ngOnIt should be called', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
  });

  it('should be navigated to home if user is already authenticated', async() => {
    router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    authService.currentUserValue;
    expect(authService.currentUserValue.username).toContain('TestUserName');
    expect(authService.currentUserValue).toBeDefined();
    expect(authService.currentUserValue).toBeTruthy();
    // expect(routerSpy).toHaveBeenCalled();
  });

  it('should be able to call onSubmit method when form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('form should not be submitted if invalid', () => {
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
    component.onSubmit();
  });

  it('form should be submitted if valid', () => {
    router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    const form = new FormBuilder();
    fixture.detectChanges();
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();
    const authSpy = spyOn(authService, 'login').and.returnValue(of('http://someurl'));
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalled();
  });

  // it('error case should be handled if error occured in submitting a form', () => {
  //   const form = new FormBuilder();
  //   fixture.detectChanges();
  //   component.loginForm.controls['username'].setValue("test");
  //   component.loginForm.controls['password'].setValue("123456789");
  //   expect(component.loginForm.valid).toBeTruthy();
  //   const authSpy = spyOn(authService, 'login').and.returnValue(of(throwError('Error!')));
  //   component.onSubmit();
  //   expect(component.loading).toBe(false);
  // });
});
