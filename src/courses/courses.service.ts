import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    await this.prisma.course.update({
      where: {
        id,
      },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.course.delete({
      where: {
        id,
      },
    });
  }
}
