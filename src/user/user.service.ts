import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data): Promise<UserDocument> {
    const newUser = new this.userModel(data)
    return newUser.save()
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email
    }).exec()
  }
}
