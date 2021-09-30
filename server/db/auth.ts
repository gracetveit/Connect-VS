import { User } from '.prisma/client';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import db from './';

const hashPassword = async (pw: string) => {
  return await argon2.hash(pw);
};

const verifyPassword = async (user: User, pw: string) => {
  return await argon2.verify(user.pwHash, pw);
};

const generateToken = async (username: string, pw: string) => {
  const user = await db.user.findUnique({ where: { username } });
  if (!user || (await argon2.verify(user.pwHash, pw))) {
    const error = Error('Incorrect Username/Password');
    throw error;
  }
  return jwt.sign(user.id, process.env.JWT);
};

const verifyToken = async (token: string) => {
  try {
    const id = jwt.verify(token, process.env.JWT);
    const user = await db.user.findUnique({ where: { id: id as string } });
    if (!user) {
      throw 'no';
    }
    return user;
  } catch (ex) {
    const error = Error('Invalid Token');
    throw error;
  }
};
