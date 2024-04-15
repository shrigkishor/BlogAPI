import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Users } from 'src/modules/auth/schema/user.schema';

export class createBlogDto {
  @IsNotEmpty()
  @IsString()
  readonly head: string;
  readonly desc: string;

  readonly profilePic: string;

  readonly blogImg: string;

  readonly authorName: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsString({ each: true })
  readonly tags: string[];

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: Users;
}
