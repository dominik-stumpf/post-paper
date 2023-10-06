import { api, pbCookieKey } from '@/server-data';
import { cookies } from 'next/headers';
import PocketBase, { cookieSerialize } from 'pocketbase';

async function getData() {
  const pb = new PocketBase(api);
  const cookie = cookies().get(pbCookieKey);
  if (!cookie) {
    return null;
  }
  const cookieString = cookieSerialize(cookie.name, cookie.value);
  pb.authStore.loadFromCookie(cookieString);
  return pb.authStore.model;
}

export default async function Page() {
  console.log(await getData());
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary" type="button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
