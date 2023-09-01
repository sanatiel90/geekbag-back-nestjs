import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from '../../decorators/ActiveUserId';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllByUser(@ActiveUserId() userId: string) {
    this.categoriesService.findAllByUser(userId);
  }
}
