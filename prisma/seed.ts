import db from '../server/db';
import faker from 'faker';
import * as argon2 from 'argon2';
import { User } from '.prisma/client';

const createUsers = async (n: number): Promise<User[]> => {
  if (n === 0) return [];
  const user = await db.user.create({
    data: {
      username: faker.internet.userName(),
      pwHash: await argon2.hash(faker.internet.password()),
    },
  });
  return [user, ...(await createUsers(n - 1))];
};

const createMe = async () => {
  return await db.user.create({
    data: {
      username: 'main',
      pwHash: await argon2.hash('12345'),
    },
  });
};

const goodGames = [
  { name: 'Melty Blood: Type Lumina' },
  { name: 'Guilty Gear Strive' },
];

const createGames = async (n: number) => {
  if (n === 0) return;
  try {
    const game = await db.game.create({
      data: {
        name: `${faker.hacker.adjective()} ${faker.hacker.noun()} ${Math.floor(
          Math.random() * 15
        )}`,
      },
    });
  } catch (e) {}
  await createGames(n - 1);
  await db.game.createMany({ data: goodGames, skipDuplicates: true });
};

const createRankings = async (n: number, userList: User[]) => {
  if (n === 0) return;
  const userId = userList[Math.floor(Math.random() * userList.length)].id;
  const gameId = Math.floor(Math.random() * 24) + 1;
  try {
    await db.ranking.create({
      data: {
        gamesPlayed: Math.floor(Math.random() * 1000),
        score: Math.floor(Math.random() * 1000) + 1000,
        userId,
        gameId,
      },
    });
  } catch (error: any) {
    await createRankings(n, userList);
  }
  await createRankings(n - 1, userList);
};

const main = async () => {
  const n = 100;
  const userList = await createUsers(n);
  console.log(`${n} Users created`);
  const me = await createMe();
  console.log('main user has been created');
  await createGames(25 - goodGames.length);
  console.log('Games Created');
  await createRankings(n, userList);
  console.log('Rankings Created');
  await createRankings(5, [me]);
  console.log('main Rankings created');
};

main();
