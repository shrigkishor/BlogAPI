import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blogs, BlogsModel } from './schema/blog.schema';
import * as mongoose from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blogs.name)
    private readonly blogModel: BlogsModel,
  ) {}

  async findAllBlogs(query: ExpressQuery) {
    const responsePerPage = 3;
    const currentPage: number = Number(query.page) || 1;
    const skip: number = responsePerPage * (currentPage - 1);
    const keywords: any = {};

    if (query.keyword) {
      keywords.head = {
        $regex: query.keyword as string,
        $options: 'i',
      };
      //mongoose pagination v2
    }
    if (query.tags) {
      keywords.tags = { $in: query.tags as string[] };
    }

    // const options = {
    //   limit: responsePerPage,
    //   page: currentPage,
    // };

    const blog = await this.blogModel
      .find(keywords)
      .skip(skip)
      .limit(responsePerPage);
    return blog;
  }

  async createNewBlog(blog: Blogs, userId: string): Promise<Blogs> {
    const TrackedBlog = Object.assign(blog, {
      user: new mongoose.Types.ObjectId(userId),
    });
    const res = await this.blogModel.create(TrackedBlog);
    return res;
  }

  async findSingleBlog(id: string): Promise<Blogs> {
    const IsValid = mongoose.isValidObjectId(id);
    if (!IsValid) {
      throw new BadRequestException('Please enter correct idd');
    }
    const singleBlog = await this.blogModel.findById(id);
    if (!singleBlog) {
      throw new NotFoundException('Blog not found');
    }
    return singleBlog;
  }

  async updateBlog(id: string, newBlog: Blogs): Promise<Blogs> {
    return await this.blogModel.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBlog(id: string): Promise<Blogs> {
    return await this.blogModel.findByIdAndDelete(id);
  }
}
