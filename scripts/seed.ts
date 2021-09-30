import db from '../server/db';
import faker from 'faker';

const deleteAll = async () => {
  await db.user.deleteMany({});
};

const createUsers = async (n: number) => {
  if (n === 0) return;
  await db.user.create({
    data: {
      username: faker.internet.userName(),
      pwHash: faker.internet.password(),
    },
  });
  createUsers(n - 1);
};

const main = async () => {
  const n = 100;
  await deleteAll();
  console.log('Database reset');
  await createUsers(n);
  console.log(`${n} Users created`);
};

main();
