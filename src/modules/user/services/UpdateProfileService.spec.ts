import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able updating profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Adriano',
      email: 'amoreira02@gmail.com',
    });

    expect(updatedUser.name).toBe('Adriano');
    expect(updatedUser.email).toBe('amoreira02@gmail.com');
  });

  it('should not be able updating profile when user not exists', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing',
        name: 'Adriano',
        email: 'amoreira02@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able updating profile when user email exists for another user', async () => {
    const user = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Adriano',
      email: 'amoreira2@gmail.com',
      password: '123456',
    });

    expect(
      updateProfileService.execute({
        user_id: user2.id,
        name: 'Adriano S. Moreira',
        email: 'amoreira@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able updating profile when old password is empty', async () => {
    const user = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Adriano Moreira',
        email: 'amoreira@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able updating profile when old password is wrong', async () => {
    const user = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Adriano Moreira',
        email: 'amoreira@gmail.com',
        password: '123123',
        old_password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able updating profile changind password', async () => {
    const { id, name, email, password } = await fakeUserRepository.create({
      name: 'Adriano Moreira',
      email: 'amoreira@gmail.com',
      password: '123456',
    });

    const updatedUserWithNewPassword = await updateProfileService.execute({
      user_id: id,
      name,
      email,
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUserWithNewPassword.password).toBe('123123');
  });
});
