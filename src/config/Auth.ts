import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';

class Auth {
  private _secret = String(process.env.SECRET);

  public async generateToken(id: any): Promise<string> {
    const token = await jwt.sign({ id }, this._secret, {
      expiresIn: '2d',
    });

    return token;
  }

  public async decodedToken(token: string): Promise<any> {
    const decoded = await promisify(jwt.verify)(token, this._secret);

    return decoded;
  }
}

export default new Auth();
