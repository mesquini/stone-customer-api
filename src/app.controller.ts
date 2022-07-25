import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  root() {
    return {
      message: 'Customer API - ' + process.env.NODE_ENV.toUpperCase(),
      status: 'OK',
      version: process.env.npm_package_version,
    };
  }
}
