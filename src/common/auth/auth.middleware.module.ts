import { Module } from '@nestjs/common';

import { JwtAuthMiddleware } from './services/jwt-auth.middleware.service';

@Module({
  imports: [],

  providers: [JwtAuthMiddleware],

  exports: [JwtAuthMiddleware],
})
export class AuthMiddlewareModule {}
