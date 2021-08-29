import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { AuthenticationService, UserService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let service: UserService;
  let router: Router;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const tb_base = {
    declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        UserService,
        AuthenticationService
      ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule(tb_base)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(UserService);
    router = TestBed.get(Router);
  });

  /**
   * ? checks if a component is truthy
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * ? checks if ngOnit have been called
  */
  it('should be able to call ngOnInit method', () => {
    const componentSpy = spyOn<any>(component, 'loadUserById');
    component.ngOnInit();
    expect(component.isEditMode).toBe(false);
  });

  /**
   * ? checks if getter property in component is getting called correctly
  */
  it('should be able to access getter', () => {
    const form = component.f;
    expect(form).hasOwnProperty('firstName');
    expect(form).hasOwnProperty('lastName');
    expect(form).hasOwnProperty('username');
    expect(form).hasOwnProperty('password');
  });

  /**
   * ? shows how we can call a private method in a component
  */
  it('should be able to call loadUserById method', () => {
    const componentSpy = spyOn<any>(component, 'loadUserById');
    component['loadUserById'](1);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledWith(1);
  });

  /**
   * ? shows how we can spy on some method which is in private method in a component
  */
  it('should be able to check loadUserById method', () => {
    const user = {
      id: 1,
      username: 'johndoe',
      password: 'johndoe',
      firstName: 'john',
      lastName: 'doe',
      token: 'abcd'
    };
    const userServiceSpy = spyOn(service, 'getUserById').and.returnValue(of(user));
    const registerFormSpy = spyOn(component.registerForm, 'patchValue');
    const componentSpy = spyOn<any>(component, 'loadUserById').and.callThrough();
    componentSpy.call(component, 1);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledWith(1);
    expect(userServiceSpy).toHaveBeenCalled();
    expect(registerFormSpy).toHaveBeenCalled();
    expect(registerFormSpy).toHaveBeenCalledWith({firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password});
  });

  /**
   * ? shows alternative way on how we can spy on some method which is in private method in a component
  */
  it('should be able to check loadUserById method', () => {
    const user = {
      id: 1,
      username: 'johndoe',
      password: 'johndoe',
      firstName: 'john',
      lastName: 'doe',
      token: 'abcd'
    };
    const userServiceSpy = spyOn(service, 'getUserById').and.returnValue(of(user));
    const registerFormSpy = spyOn(component.registerForm, 'patchValue');
    component['loadUserById'](1);
    expect(userServiceSpy).toHaveBeenCalled();
    expect(registerFormSpy).toHaveBeenCalled();
    expect(registerFormSpy).toHaveBeenCalledWith({firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password});
  });

  /**
   * ? checks if form is invalid
  */
  it('should return if register form is inavlid', () => {
    component.submitted = true;
    const submittedValue = component.onSubmit();
    expect(component.registerForm.valid).toBeFalsy();
    expect(submittedValue).not.toBeDefined();
  });

  /**
   * ? checks if form is valid
  */
  it('should be able to add a new user', () => {
    const routerSpy = spyOn(router, 'navigate');
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = false;
    const userServiceSpy = spyOn(service, 'register').and.returnValue(of({}));
    component.onSubmit();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  /**
   * ? handles the error case when an observable throws an error
  */
  it('should not be able to add a new user if any error occured', () => {
    const routerSpy = spyOn(router, 'navigate');
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = false;
    component.loading = true;
    const userServiceSpy = spyOn(service, 'register').and.returnValue(throwError('Error!'));
    component.onSubmit();
    fixture.detectChanges();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  /**
   * ? checks if form is valid
  */
  it('should be able to edit a user', () => {
    const userServiceSpy = spyOn(service, 'edit').and.returnValue(of({}));
    const routerSpy = spyOn(router, 'navigate');
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = true;
    component.onSubmit();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  /**
   * ? handles the error case when an observable throws an error
  */
  it('should not be able to edit a user if any error occured', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = true;
    component.loading = true;
    const userServiceSpy = spyOn(service, 'edit').and.returnValue(throwError('Error!'));
    component.onSubmit();
    fixture.detectChanges();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });
});

/**
   * ? another describe block to have different provider for activated route
   * ? Reference -> https://github.com/angular/quickstart/issues/320
  */
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const tb_base = {
    declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        UserService,
        AuthenticationService
      ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule(tb_base);
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        params: of({id: 123})
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * ? provide activated params values
  */
  it('should be able to call ngOnInit method without activated params', () => {
    const componentSpy = spyOn<any>(component, 'loadUserById');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.id).toBe(123);
    expect(component.id).toBe(123);
    expect(component.isEditMode).toBe(true);
  });
});
