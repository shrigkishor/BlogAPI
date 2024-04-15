import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResolveTimestamps, Document, Model } from 'mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ type: String, trim: true })
  userName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: String, trim: true })
  desc: string;

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users).index({
  isEmailVerified: 1,
});
export type UsersDocument = Users &
  ResolveTimestamps<Document, { timestamps: true }>;
export type UsersModel = Model<UsersDocument>;
