import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

export class JwtDecoder {
  async decodeJwt(token: string): Promise<any> {
    const extractedToken = this.extractToken(token);

    const payload = await this.verifyAndDecode(extractedToken);

    return this.validatePayload(payload) ? payload : undefined;
  }

  validatePayload(payload: any): boolean {
    return !!payload;
  }

  private async verifyAndDecode(token: string): Promise<any> {
    try {
      const response = await axios.get(process.env.KEYCLOAK_USERINFO, {
        headers: { Authorization: 'bearer ' + token },
      });

      if (response.status !== 200) throw new Error(response.data);

      return response.data;
    } catch (err: any) {
      const errorMessage = err?.message || err?.error;

      if (errorMessage.includes('expired'))
        throw new UnauthorizedException(errorMessage);

      return undefined;
    }
  }

  private extractToken(payload: string): string {
    if (payload) return payload.split(' ')[1];

    return payload;
  }
}
