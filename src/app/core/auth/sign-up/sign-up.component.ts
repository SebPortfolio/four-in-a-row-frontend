import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { displayNameFormatValidator } from '../../../common/validators/displayNameFormat.validator';
import { passwordFormatValidator } from '../../../common/validators/passwordFormat.validator';
import { AuthApiService } from '../auth-api.service';
import { AuthUserResponse, RegisterRequest } from '../auth.model';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [ReactiveFormsModule, FaIconComponent, RouterLink, NgbTooltipModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.less',
})
export class SignUpComponent {
    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService,
        private router: Router
    ) {}

    signUpForm!: FormGroup;
    showPassword: boolean = false;

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            displayName: this.fb.control('', {
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30),
                    displayNameFormatValidator(),
                ],
            }),
            email: this.fb.control('', {
                validators: [Validators.required, Validators.email],
            }),
            password: this.fb.control('', {
                validators: [Validators.required, Validators.minLength(8), passwordFormatValidator()],
            }),
        });
    }

    onSubmit(): void {
        if (this.signUpForm.valid) {
            this.signUpForm.disable();
            const registerRequest: RegisterRequest = {
                displayName: this.signUpForm.get('displayName')?.value,
                email: this.signUpForm.get('email')?.value,
                password: this.signUpForm.get('password')?.value,
            };
            this.authApiService.register(registerRequest).subscribe({
                next: (res: AuthUserResponse) => {
                    this.router.navigate(['players', res.userContext.playerId]);
                },
                error: (err: HttpErrorResponse) => {
                    console.error('regsiter response error: ', err);
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
    faCircleInfo = faCircleInfo;
}
