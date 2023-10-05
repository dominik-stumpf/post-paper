import PocketBase from 'pocketbase';

export const api = 'http://127.0.0.1:8090';
export const seedUserData = {
  username: 'test_username',
  email: 'test923711@example.com',
  emailVisibility: true,
  password: '12345678',
  passwordConfirm: '12345678',
  name: 'test',
};

export async function seedUser() {
  const pb = new PocketBase(api);

  const record = await pb.collection('users').create(seedUserData);

  console.log(`user created ${record}`);
}