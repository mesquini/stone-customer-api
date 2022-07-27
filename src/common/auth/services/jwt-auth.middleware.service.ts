import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtDecoder } from '../decoders/jwt.decoder';

import { CustomerJwtDecorator } from '../decoders/customer-jwt.decoder';

@Injectable()
export class JwtAuthMiddleware implements CanActivate {
  private readonly customerJwtDecoder: JwtDecoder;

  constructor() {
    this.customerJwtDecoder = new CustomerJwtDecorator();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    const jwtCustomer = await this.customerJwtDecoder.decodeJwt(token);

    if (!jwtCustomer) throw new UnauthorizedException();

    request.customer = jwtCustomer;

    return true;
  }
}
