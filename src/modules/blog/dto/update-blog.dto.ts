import { IsArray, IsEmpty, IsOptional, IsString } from 'class-validator';
import { Users } from 'src/modules/auth/schema/user.schema';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  readonly head: string;
  readonly desc: string;

  readonly profilePic: string;

  readonly blogImg: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: Users;
}
