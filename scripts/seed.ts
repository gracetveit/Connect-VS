import db from '../server/db';
import faker from 'faker';
import * as argon2 from 'argon2';

const deleteAll = async () => {
  await db.user.deleteMany({});
};

const createUsers = async (n: number) => {
  if (n === 0) return;
  await db.user.create({
    data: {
      username: faker.internet.userName(),
      pwHash: await argon2.hash(faker.internet.password()),
    },
  });
  createUsers(n - 1);
};

const createMe = async () => {
  await db.user.create({
    data: {
      username: 'main',
      pwHash: await argon2.hash('12345'),
    },
  });
};

const main = async () => {
  const n = 100;
  await deleteAll();
  console.log('Database reset');
  await createUsers(n);
  console.log(`${n} Users created`);
  await createMe();
  console.log('Grace has been created');
};

main();
