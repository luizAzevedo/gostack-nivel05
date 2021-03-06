import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionController';

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionRouter;
