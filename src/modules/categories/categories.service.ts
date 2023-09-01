import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAllByUser(userId: string) {
    return this.categoriesRepository.listAllByUser({
      where: {
        user_id: userId,
      },
    });
  }
}
