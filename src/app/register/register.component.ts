import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  id: number;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isEditMode = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private userService: UserService
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.activatedRoute.params.subscribe(params => {
      // check wheather to enable edit or add mode
      if(params.id) {
        this.id = params.id;
        this.isEditMode = true;
        this.loadUserById(params.id);
      } else {
        this.isEditMode = false;
      }
    });

  }

  // need to initialize in both add/edit case
  private initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private loadUserById(id: number) {
    this.userService.getUserById(id)
        .subscribe(user => {
          this.registerForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
          });
        });  
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    if(!this.isEditMode) {
      this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(['/login']);
            },
            error => {
              this.loading = false;
            });
    } else {
      // appending timestamp in edit case
      const user = {
        ...this.registerForm.value,
        timestamp: new Date()
      };
      this.userService.edit(this.id, user)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(['/home']);
            },
            error => {
              this.loading = false;
      });
    }
  }
}
