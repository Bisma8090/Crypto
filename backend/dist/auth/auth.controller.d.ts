import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): void;
    googleCallback(req: any, res: any): Promise<void>;
}
