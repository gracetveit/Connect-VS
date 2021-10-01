import express, { NextFunction, Request, Response } from 'express';
import * as argon2 from 'argon2';
import { generateToken, verifyToken } from './db/auth';
import db from './db';

const router = express.Router();

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await generateToken(req.body.username, req.body.password);
    await db.user.update({
      data: { status: 'ONLINE' },
      where: { id: (await verifyToken(token)).id },
    });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db.user.create({
      data: {
        username: req.body.username,
        pwHash: await argon2.hash(req.body.password),
        status: 'ONLINE',
      },
    });
    res.send({
      token: await generateToken(req.body.username, req.body.password),
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await verifyToken(req.headers.authorization as string));
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await verifyToken(req.headers.authorization as string);
    await db.user.update({
      data: { status: 'OFFLINE' },
      where: { id: user.id },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/me', me);

export default router;
