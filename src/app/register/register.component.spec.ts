import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { AuthenticationService, UserService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        UserService,
        AuthenticationService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to access getter', () => {
    const form = component.f;
    expect(form).hasOwnProperty('firstName');
    expect(form).hasOwnProperty('lastName');
    expect(form).hasOwnProperty('username');
    expect(form).hasOwnProperty('password');
  });

  it('should be able to add a new user', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = false;
    const service = TestBed.get(UserService);
    spyOn(service, 'register').and.callThrough();
    component.onSubmit(); 
  });

  it('should be able to edit a user', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['firstName'].setValue("Anna");
    component.registerForm.controls['lastName'].setValue("Lane");
    component.registerForm.controls['username'].setValue("annelane");
    component.registerForm.controls['password'].setValue("annalane");
    expect(component.registerForm.valid).toBeTruthy();
    component.isEditMode = true;
    const service = TestBed.get(UserService);
    spyOn(service, 'register').and.callThrough();
    component.onSubmit();
  });
});
