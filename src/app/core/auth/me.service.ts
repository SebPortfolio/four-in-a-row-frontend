import { Injectable, signal } from '@angular/core';
import { MyProfile } from '../../user/user.model';

@Injectable({
    providedIn: 'root',
})
export class MeService {
    private readonly _currentUser = signal<MyProfile | null>(null);

    public currentUser = this._currentUser.asReadonly();

    public setUser(user: MyProfile): void {
        console.log('User setzen: ', user);
        this._currentUser.set(user);
    }

    public resetUser(): void {
        this._currentUser.set(null);
    }
}
