import {verify, sign} from 'jsonwebtoken';

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
