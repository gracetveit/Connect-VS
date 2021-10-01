import express, { NextFunction, Request, Response } from 'express';
import db from '../db';

const router = express.Router();

const getSingleGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await db.game.findUnique({
      where: { name: req.params.gameName },
      include: {
        rankings: {
          select: {
            score: true,
            user: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    });
    if (game) {
      res.send(game);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await db.game.findMany();
    res.send(games);
  } catch (error) {
    next(error);
  }
};

router.get('/:gameName', getSingleGame);
router.get('/', getAllGames);

export default router;
