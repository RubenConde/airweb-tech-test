interface JWTPayload {
   [key: string]: string | number;
   email: string;
   userId: number;
   iat: number;
   exp: number;
}
