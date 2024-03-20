import {verify, sign} from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export type hashUserPayload = {
  email: string,
  id: string
}

export const signToken = async (data: hashUserPayload) =>{
  try {
    const token = await sign(data, `${process.env.JWT_SECRET}`, {expiresIn: '1h'});
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (token: string) =>{
  try {
    const user = await verify(token, `${process.env.JWT_SECRET}`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const hash = async(data: string) => {
  const salt = genSaltSync(10);
  const hashed = hashSync(data, salt);
  if (hashed && salt) {
    return { hashed, salt };
  }
  return false;
}

export const compareData = (data: string, hashed: string) => {
  const isValid = compareSync(data, hashed);
  return !!isValid;
};
