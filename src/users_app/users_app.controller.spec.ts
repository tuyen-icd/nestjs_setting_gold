import { Test, TestingModule } from '@nestjs/testing';
import { UsersAppController } from './users_app.controller';

describe('UsersAppController', () => {
  let controller: UsersAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAppController],
    }).compile();

    controller = module.get<UsersAppController>(UsersAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
