import { JwtPayload } from "jwt-decode";

export interface JwtPayloadUser extends JwtPayload {
  email: string;
  password: string;
}
