import { BaseRepository } from '@repositories/base.repository';
import { User } from '@entities/user.entity';
import { Image } from '@entities/image.entity';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}

export class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }
}

