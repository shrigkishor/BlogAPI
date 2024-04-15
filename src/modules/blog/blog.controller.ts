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
import { BlogService } from './blog.service';
import { createBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Blogs } from './schema/blog.schema';
import { Request } from 'express';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBlogs(@Query() query?: ExpressQuery): Promise<Blogs[]> {
    return this.blogService.findAllBlogs(query);
  }

  @Post('create')
  @UseGuards(AuthGuard()) //checking if user is logined
  async createBlog(
    @Body() blog: createBlogDto,
    @Req() req: Request,
  ): Promise<Blogs> {
    // console.log(req.user,"Request")
    return this.blogService.createNewBlog(blog, req.user._id);
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  async findSingleBlog(@Param('id') id: string): Promise<Blogs> {
    return this.blogService.findSingleBlog(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard())
  async update(
    @Param('id')
    id: string,
    @Body()
    newBlog: UpdateBlogDto,
  ): Promise<Blogs> {
    return this.blogService.updateBlog(id, newBlog);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard())
  async deleteTheBlog(
    @Param('id')
    id: string,
  ): Promise<Blogs> {
    return this.blogService.deleteBlog(id);
  }
}
