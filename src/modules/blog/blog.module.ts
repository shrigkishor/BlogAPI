import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Blogs, BlogsSchema } from './schema/blog.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Blogs.name, schema: BlogsSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
