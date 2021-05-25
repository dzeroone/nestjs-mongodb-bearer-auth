import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Token, TokenDocument } from './schemas/token.schema';
const seedChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async create(data): Promise<TokenDocument> {
    data.token = this.generateNewToken()
    const newModel = new this.tokenModel(data)
    return newModel.save()
  }

  async getTokenObjByToken(token: string): Promise<TokenDocument> {
    return this.tokenModel.findOne({
      token
    }).exec()
  }

  private generateNewToken() {
    const buffer = crypto.randomBytes(32)
    let str = ''
    for(let i=0; i < buffer.length; i++) {
      str += seedChar[buffer[i]%seedChar.length]
    }
    return str
  }
}
