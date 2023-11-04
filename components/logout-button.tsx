import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function deauthenticateUser() {
    await fetch('/auth/sign-out', { method: 'POST' });
    router.refresh();
    router.push('/login');
  }

  return (
    <button type="button" onClick={deauthenticateUser}>
      Logout
    </button>
  );
}
