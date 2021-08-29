import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService, UserService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from '../models/user.model';

/**
 * ? stub for Authentication Service
*/
export class AuthenticationServiceStub {
  user = {
    id: 1,
    firstName: 'sarthak',
    lastName: 'sarthak',
    username: 'sarthak',
    password: 'sarthak',
    token: 'sarthak'
  };

  get currentUserValue(): User {
    return this.user;
  }
}

/**
 * ? stub for User Service
*/
export class UserServiceStub {
  user = {
    id: 1,
    firstName: 'sarthak',
    lastName: 'sarthak',
    username: 'sarthak',
    password: 'sarthak',
    token: 'sarthak'
  };

  userCollection: User[] = [{
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

  delete(id: number) {
    return of([]);
  }

  getAll(): Observable<User[]> {
    return of(this.userCollection);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthenticationService;

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
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: UserService, useClass: UserServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  /**
   * ? checks if a component is truthy
  */
  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * ? calls the actual service and suitable for simpler services
   * ! need to change provider array to provide real service
  */
  // it('should contain username when user go to homepage', () => {
  //   authService = TestBed.get(AuthenticationService);
  //   const header = fixture.debugElement.query(By.css('h1'));
  //   const element: HTMLElement = header.nativeElement;
  //   const user = new User();
  //   user.firstName = 'sarthak';
  //   authService.currentUser = of(user);
  //   authService.currentUser.subscribe(() => {
  //     fixture.detectChanges();
  //     expect(element.textContent).toContain('sarthak');
  //   });
  // });

  /**
   * ? provide a spy for a getter method in service
   * ! need to change provider array to provide real service
   * ? jasmine.createSpy can be used if dont want to provide the implementation
  */
  // it('should contain username when user go to homepage', () => {
  //   const user = new User();
  //   user.firstName = 'sarthak';
  //   authService = TestBed.get(AuthenticationService);
  //   spyOnProperty(authService, 'currentUserValue').and.returnValue(user);
  //   component.currentUser = user;
  //   fixture.detectChanges();
  //   const header = fixture.debugElement.query(By.css('h1'));
  //   const element: HTMLElement = header.nativeElement;
  //   expect(element.textContent).toContain('sarthak');
  // });

  /**
   * ? provide a stub instead of a real service and useful in complex services
  */
  it('should contain username when user go to homepage', () => {
    authService = TestBed.get(AuthenticationService);
    component.currentUser = authService.currentUserValue;
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('h1'));
    const element: HTMLElement = header.nativeElement;
    expect(element.textContent).toContain('sarthak');
  });

  /**
   * ? checks if ngOnit have been called
  */
  it('ngOnIt should be called', () => {
    const myspy = spyOn(component, 'loadAllUsers');
    component.ngOnInit();
    expect(myspy).toHaveBeenCalled();
  });

  /**
   * ? checks if template is integrated with component file
  */
  it('should call deleteUser method when delete button is clicked', () => {
    fixture.detectChanges();
    const button: HTMLElement = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(button.innerHTML).toContain('Delete');
    const myspy = spyOn(component, 'deleteUser');
    button.click();
    expect(myspy).toHaveBeenCalled();
  });

  /**
   * ? checks if a method have been called in subscribe block
  */
  it('should delete user when an id is provided', () => {
    const service = TestBed.get(UserService);
    const spy = spyOn(service, 'delete').and.callFake(() => of([]));
    const compSpy = spyOn(component, 'loadAllUsers');
    component.deleteUser(1);
    expect(spy).toHaveBeenCalled();
    expect(compSpy).toHaveBeenCalled();
    expect(compSpy).toHaveBeenCalledTimes(1);
  });

  /**
   * ? checks if a component method gets called correctly
  */
  it('should call loadAllUsers method', () => {
    const myspy = spyOn(component, 'loadAllUsers');
    component.loadAllUsers();
    expect(myspy).toHaveBeenCalled();
    expect(myspy).toHaveBeenCalledTimes(1);
  });

  /**
   * ? mocks a service call and checks the implementation of component
  */
  it('should load all users', () => {
    const testData = [{
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
    const userServiceSpy = spyOn(service, 'getAll').and.returnValue(of(testData));
    component.loadAllUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(testData);
    expect(userServiceSpy).toHaveBeenCalled();
  });
});
