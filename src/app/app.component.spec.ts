import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let authService: AuthenticationService;
  let router: Router;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        AuthenticationService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    authService = TestBed.get(AuthenticationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  /**
   * ? checks if a component is truthy
  */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * ? calls the actual service and suitable for simpler services
   * ! need to change provider array to provide real service
  */
  it('ngOnIt should be called', () => {
    const user = {
      id: 1,
      firstName: 'sarthak',
      lastName: 'sarthak',
      username: 'sarthak',
      password: 'sarthak',
      token: 'sarthak'
    };
    authService = TestBed.get(AuthenticationService);
    authService.currentUser = of(user);
    authService.currentUser.subscribe(() => {
      fixture.detectChanges();
      expect(component.currentUser).toEqual(user);
    });
    component.ngOnInit();
  });

  /**
   * ? calls the actual service and suitable for simpler services
   * ? checks if a route has been called and mocks the router
  */
  it('should call the logout method', () => {
    router = TestBed.get(Router);
    const authSpy = spyOn(authService, 'logout');
    const routerSpy = spyOn(router, 'navigate');
    component.logout();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
