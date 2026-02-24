import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthApiService } from '../auth-api.service';
import { AuthUserResponse, LoginRequest } from '../auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, FaIconComponent, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.less',
})
export class LoginComponent {
    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService,
        private router: Router
    ) {}

    loginForm!: FormGroup;
    showPassword: boolean = false;

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: this.fb.control('', {
                validators: [Validators.required, Validators.email],
            }),
            password: this.fb.control('', {
                validators: [Validators.required],
            }),
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loginForm.disable();
            const loginRequest: LoginRequest = {
                email: this.loginForm.get('email')?.value,
                password: this.loginForm.get('password')?.value,
            };
            this.authApiService.login(loginRequest).subscribe({
                next: (res: AuthUserResponse) => {
                    this.router.navigate(['players', res.userContext.playerId]);
                },
                error: (err: HttpErrorResponse) => {
                    console.error('login response error: ', err);
                },
            });
        } else {
            console.warn('Formular noch nicht valide');
        }
    }

    onSwitchVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    faEye = faEye;
    faEyeSlash = faEyeSlash;
}
