import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService, UserService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
          AuthenticationService,
          UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render UserName in a h1 tag', () => {
    fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hi');
  });

  it('ngOnIt should be called', () => {
    const myspy = spyOn(component, 'loadAllUsers');
    component.ngOnInit();
    expect(myspy).toHaveBeenCalled();
  });

  it('should call loadAllUsers method', () => {
    const myspy = spyOn(component, 'loadAllUsers').and.callThrough();
    component.loadAllUsers();
    expect(myspy).toHaveBeenCalled();
  });

  it('should load all users', () => {
    const mockuser = [{
      id: 1,
      username: 'johndoe',
      password: 'johndoe',
      firstName: 'john',
      lastName: 'doe',
      token: 'abcd'
    }];

    const service = TestBed.get(UserService);
    
    spyOn(service, 'getAll').and.returnValue(from([mockuser]));

    component.loadAllUsers();
  
    expect(component.users).toEqual(mockuser);
  });

  it('should call deleteUser method', () => {
    const myspy = spyOn(component, 'deleteUser').and.callThrough();
    component.deleteUser(null);
    expect(myspy).toHaveBeenCalled();
  });

  it('should delete user', () => {
    const mockuser = [{
      id: 1,
      username: 'johndoe',
      password: 'johndoe',
      firstName: 'john',
      lastName: 'doe',
      token: 'abcd'
    },
    {
      id: 2,
      username: 'janedoe',
      password: 'janedoe',
      firstName: 'jane',
      lastName: 'doe',
      token: 'abcd'
    }];

    const service = TestBed.get(UserService);

    spyOn(service, 'delete').and.callFake((id) => {
      return from([mockuser[1]]);
    });

    component.deleteUser(1);

    expect(component.users.length).toBeLessThan(2);
  });
});