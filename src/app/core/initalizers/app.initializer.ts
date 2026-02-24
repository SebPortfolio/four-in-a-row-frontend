import { AuthApiService } from '../auth/auth-api.service';

export function initializeApp(authService: AuthApiService) {
    return () => authService.checkAuth();
}
