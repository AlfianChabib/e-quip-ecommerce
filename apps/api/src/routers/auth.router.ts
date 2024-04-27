import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';
import passport from 'passport';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.authController.registerEmail);

    // google auth
    this.router.get('/google', passport.authenticate('google'));
    this.router.get('/google/callback', this.authController.googleCallback);
  }

  getRouter(): Router {
    return this.router;
  }
}
