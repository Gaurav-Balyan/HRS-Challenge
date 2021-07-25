import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from "./authentication.service";
import { User } from '../models/user.model';

describe("AuthenticationService", () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthenticationService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthenticationService);
  });

  xdescribe('Testing Authentication service', () => {
    it('should be created', () => {
      service = TestBed.get(AuthenticationService);
      expect(service).toBeTruthy();
    });

  //   it('should call the login method', () => {
  //     const myspy = spyOn(service, 'login').and.callThrough();
  //     service.login('johndoe','johndoe');
  //     expect(myspy).toHaveBeenCalled();
  //   });

  //   it('should return the user after login is called', () => {
  //     const mockuser = {
  //       id: 1,
  //       username: 'johndoe',
  //       password: 'johndoe',
  //       firstName: 'john',
  //       lastName: 'doe',
  //       token: 'abcd'
  //     };

  //     service.login('johndoe', 'johndoe').subscribe(user => {
  //       expect(user.username).toEqual(mockuser.username);
  //       expect(user.password).toEqual(mockuser.password);
  //       expect(user.firstName).toEqual(mockuser.firstName);
  //       expect(user.lastName).toEqual(mockuser.lastName);
  //     });

  //     const req = httpTestingController.expectOne('http://localhost:4000/users/authenticate');

  //     expect(req.request.method).toEqual('POST');

  //     req.flush(mockuser);
  //   });

  //   it('should call the logout method', () => {
  //     const myspy = spyOn(service, 'logout').and.callThrough();
  //     service.logout();
  //     expect(myspy).toHaveBeenCalled();
  //   });
  });
});
