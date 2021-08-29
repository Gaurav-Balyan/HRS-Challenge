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

  describe('Testing Authentication service', () => {
    /**
     * ? checks if service is created
    */
    it('should be created', () => {
      service = TestBed.get(AuthenticationService);
      expect(service).toBeTruthy();
    });

    /**
     * ? mock another service
    */
    it('should call the login method', () => {
      const myLoginSpy = spyOn(service, 'login');
      service.login('johndoe','johndoe');
      expect(myLoginSpy).toHaveBeenCalledWith('johndoe','johndoe');
    });

    /**
     * ? mocks local storage and service
    */
    it('should return the user after login is called', () => {
      const mockuser = {
        id: 1,
        username: 'johndoe',
        password: 'johndoe',
        firstName: 'john',
        lastName: 'doe',
        token: 'abcd'
      };
      const localStorageSpy = spyOn(localStorage, 'setItem');

      service.login('johndoe', 'johndoe').subscribe(user => {
        expect(localStorageSpy).toHaveBeenCalled();
        expect(localStorageSpy).toHaveBeenCalledWith('currentUser', JSON.stringify(mockuser));
        expect(user.username).toEqual(mockuser.username);
        expect(user.password).toEqual(mockuser.password);
        expect(user.firstName).toEqual(mockuser.firstName);
        expect(user.lastName).toEqual(mockuser.lastName);
      });

      const req = httpTestingController.expectOne('http://localhost:4000/users/authenticate');
      expect(req.request.method).toEqual('POST');
      req.flush(mockuser);
    });

    /**
     * ? checks if getter is accessible
    */
    it('should get the currentUserValue from getter', () => {
      const user = service.currentUserValue;
      expect(user).toBeDefined();
    });

    /**
     * ? checks if local storage is mocked
    */
    it('should call the logout method', () => {
      const localStorageSpy = spyOn(localStorage, 'removeItem');
      service.logout();
      expect(localStorageSpy).toHaveBeenCalled();
    });
  });
});
