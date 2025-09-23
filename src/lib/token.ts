import jwt, { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

const SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object, expiresIn: string = "7d") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET) as MyJwtPayload;
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return null;
  }
}
