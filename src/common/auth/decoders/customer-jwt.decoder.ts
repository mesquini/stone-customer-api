import { JwtDecoder } from './jwt.decoder';

export class CustomerJwtDecorator extends JwtDecoder {
  decodeJwt(token: string) {
    const decodedJwt = super.decodeJwt(token);

    if (!decodedJwt) return undefined;

    return decodedJwt;
  }
}
