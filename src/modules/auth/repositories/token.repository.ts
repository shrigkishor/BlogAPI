import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseBaseRepo } from 'src/utils/mongoose-base.repo';
import { Users, UsersDocument } from '../schema/user.schema';

@Injectable()
export class UsersRepository extends MongooseBaseRepo<UsersDocument> {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UsersDocument>,
  ) {
    super(userModel);
  }
}
