import { UserController } from '@/controllers/user.controller';
import { requireUser } from '@/middlewares/auth/authorization.middleware';
import { Router } from 'express';

export class userRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/profile', requireUser, this.userController.profile);
  }

  getRouter(): Router {
    return this.router;
  }
}
