import { UseGuards, applyDecorators } from '@nestjs/common';

import { JwtAuthMiddleware } from '../services/jwt-auth.middleware.service';

export const JwtAuth = () => {
  return applyDecorators(UseGuards(JwtAuthMiddleware));
};
