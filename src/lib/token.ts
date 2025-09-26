import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

const SECRET: Secret = process.env.JWT_SECRET as Secret;

export function signJwt(payload: object, expiresIn: string = "7d") {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, SECRET, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET) as MyJwtPayload;
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return null;
  }
}
