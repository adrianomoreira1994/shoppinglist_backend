import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toEqual(user.name);
    expect(profile.email).toEqual(user.email);
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-exists' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
