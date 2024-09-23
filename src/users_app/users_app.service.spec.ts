import { Test, TestingModule } from '@nestjs/testing';
import { UsersAppService } from './users_app.service';

describe('UsersAppService', () => {
  let service: UsersAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAppService],
    }).compile();

    service = module.get<UsersAppService>(UsersAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
