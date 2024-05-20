import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { createBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { Blogs } from '../schema/blog.schema';
import { Request } from 'express';
import { PaginateQueryDto } from '../dto/query.dto';
import { AccessTokenGuard } from 'src/guards/access-token.guard';

@Controller('blogs')
@UseGuards(AccessTokenGuard)
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBlogs(@Query() query?: PaginateQueryDto): Promise<Blogs[]> {
    return this.blogService.findAllBlogs(query);
  }

  @Post('create')
  async createBlog(@Body() blog: createBlogDto, @Req() { user }: Request) {
    return this.blogService.createNewBlog(blog,user._id)
  }

  @Get(':id')
  async findSingleBlog(@Param('id') id: string): Promise<Blogs> {
    return this.blogService.findSingleBlog(id);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    newBlog: UpdateBlogDto,
  ): Promise<Blogs> {
    return this.blogService.updateBlog(id, newBlog);
  }

  @Delete(':id')
  async deleteTheBlog(
    @Param('id')
    id: string,
  ): Promise<Blogs> {
    return this.blogService.deleteBlog(id);
  }
}
