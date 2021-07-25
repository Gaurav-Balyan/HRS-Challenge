import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
  });

  describe('Testing user service', () => {
    it('should be created', () => {
      service = TestBed.get(UserService);
      expect(service).toBeTruthy();
    });

    // it('getall should make a `GET` request', () => {
    //   const user = [{
    //     id: 1,
    //     username: 'johndoe',
    //     password: 'johndoe',
    //     firstName: 'john',
    //     lastName: 'doe',
    //     token: 'abcd'
    //   }];

    //   service.getAll().subscribe(resp => {
    //     expect(resp).toEqual(user);
    //   });

    //   const dataAPI = `${service.apiUrl}/users`;
    //   const req = httpTestingController.expectOne(`${dataAPI}`);
    //   expect(req.request.method).toEqual('GET');
    //   req.flush(user);
    // });

    // it('getUserById should make a `GET` request', () => {
    //   const user = {
    //     id: 1,
    //     username: 'johndoe',
    //     password: 'johndoe',
    //     firstName: 'john',
    //     lastName: 'doe',
    //     token: 'abcd'
    //   };

    //   service.getUserById(user.id).subscribe(resp => {
    //     expect(resp).toEqual(user);
    //   });

    //   const dataAPI = `${service.apiUrl}/users/${user.id}`;
    //   const req = httpTestingController.expectOne(`${dataAPI}`);
    //   expect(req.request.method).toEqual('GET');
    //   req.flush(user);
    // });

    // it('register should have been `POST`', () => {
    //   const user = {
    //     id: 1,
    //     username: 'johndoe',
    //     password: 'johndoe',
    //     firstName: 'john',
    //     lastName: 'doe',
    //     token: 'abcd'
    //   };
    //   service.register(user).subscribe(resp => {
    //     expect(resp).toEqual(user);
    //   });

    //   const dataAPI = `${service.apiUrl}/users/register`;
    //   const req = httpTestingController.expectOne(`${dataAPI}`);
    //   expect(req.request.method).toEqual('POST');
    //   req.flush(user);
    // });

    // it('delete should have been `DELETE`', () => {
    //   const user = {
    //     id: 1,
    //     username: 'johndoe',
    //     password: 'johndoe',
    //     firstName: 'john',
    //     lastName: 'doe',
    //     token: 'abcd'
    //   };

    //   service.delete(user.id).subscribe(resp => {
    //     expect(resp).toEqual(user);
    //   });

    //   const dataAPI = `${service.apiUrl}/users/${user.id}`;
    //   const req = httpTestingController.expectOne(`${dataAPI}`);
    //   expect(req.request.method).toEqual('DELETE');
    //   req.flush(user);
    // });

    // it('edit should be `PUT`', () => {
    //   const user = {
    //     id: 1,
    //     username: 'johndoe',
    //     password: 'johndoe',
    //     firstName: 'john',
    //     lastName: 'doe',
    //     token: 'abcd'
    //   };

    //   service.edit(user.id, user).subscribe(resp => {
    //     expect(resp).toEqual(user);
    //   });

    //   const dataAPI = `${service.apiUrl}/users/${user.id}`;
    //   const req = httpTestingController.expectOne(`${dataAPI}`);
    //   expect(req.request.method).toEqual('PUT');
    //   req.flush(user);
    // });
  });
});
