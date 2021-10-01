import express, { NextFunction, Request, Response } from 'express';
import app from '../app';
import db from '../db';
import adminPriviliges from '../middleware/adminPriviliges';
import authorization from '../middleware/authorization';

const router = express.Router();

const getRankingsForGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rankings = await db.ranking.findMany({
      where: { gameId: parseInt(req.params.gameId) },
    });
    if (rankings) {
      res.send(rankings);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const getRankingsForPlayer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const rankings = await db.ranking.findMany({
      where: { userId: req.user.id },
      include: { game: true },
    });
    console.log(req.user);
    res.send(rankings);
  } catch (error) {
    next(error);
  }
};

const getRankingForPlayerByGame = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const ranking = await db.ranking.findUnique({
      where: {
        userId_gameId: {
          userId: req.user.id,
          gameId: parseInt(req.params.gameId),
        },
      },
      include: {
        game: true,
      },
    });
    res.send(ranking);
  } catch (error) {
    next(error);
  }
};

const createNewRanking = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = parseInt(req.body.gameId);
    const potentialRanking = await db.ranking.findUnique({
      where: {
        userId_gameId: { userId: req.user.id, gameId },
      },
      include: {
        game: true,
      },
    });
    if (!potentialRanking) {
      const newRanking = await db.ranking.create({
        data: { userId: req.user.id, gameId },
        include: { game: true },
      });
      res.send(newRanking);
    } else {
      res.send(potentialRanking);
    }
  } catch (error) {
    next(error);
  }
};

const editRanking = async (req: any, res: Response, next: NextFunction) => {
  try {
    const gameId = parseInt(req.params.gameId);
    const score = parseInt(req.body.score);
    const games = parseInt(req.body.games);

    const updateRanking = await db.ranking.update({
      where: { userId_gameId: { userId: req.user.id, gameId } },
      data: { score: score, gamesPlayed: games },
      include: { game: true },
    });
    res.send(updateRanking);
  } catch (error) {
    next(error);
  }
};

router.get('/byGame/:gameId', getRankingsForGame);
router.use('/me', authorization);
router.get('/me', getRankingsForPlayer);
router.post('/me', createNewRanking);
router.get('/me/:gameId', getRankingForPlayerByGame);
router.put('/me/:gameId', adminPriviliges, editRanking);

export default router;
