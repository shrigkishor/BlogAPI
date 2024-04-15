import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  ResolveTimestamps,
  Document,
  ObjectId,
  Model,
} from 'mongoose';
import { Users } from 'src/modules/auth/schema/user.schema';

@Schema({ timestamps: true })
export class Blogs {
  @Prop({ type: String, trim: true })
  head: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  desc: string;

  @Prop({ type: String })
  profilePic: string;

  @Prop({ type: String })
  blogImg: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  user: Users | ObjectId;

  @Prop()
  tags: string[];
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);
export type BlogsDocument = Blogs &
  ResolveTimestamps<Document, { timestamps: true }>;
export type BlogsModel = Model<BlogsDocument>;
