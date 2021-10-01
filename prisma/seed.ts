import db from '../server/db';
import faker from 'faker';
import * as argon2 from 'argon2';

const createUsers = async (n: number) => {
  if (n === 0) return;
  await db.user.create({
    data: {
      username: faker.internet.userName(),
      pwHash: await argon2.hash(faker.internet.password()),
    },
  });
  await createUsers(n - 1);
};

const createMe = async () => {
  await db.user.create({
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
    await db.game.create({
      data: {
        name: `${faker.hacker.adjective()} ${faker.hacker.noun()} ${Math.floor(
          Math.random() * 15
        )}`,
      },
    });
  } catch (e) {}
  await createGames(n - 1);
  await db.game.createMany({ data: goodGames });
};

const main = async () => {
  const n = 100;
  await createUsers(n);
  console.log(`${n} Users created`);
  await createMe();
  console.log('main user has been created');
  await createGames(n - goodGames.length);
  console.log('Games Created');
};

main();
