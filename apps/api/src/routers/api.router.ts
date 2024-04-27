import { Router } from 'express';
import { AuthRouter } from './auth.router';
import { userRouter } from './user.router';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;
  private userRouter: userRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.userRouter = new userRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/user', this.userRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
