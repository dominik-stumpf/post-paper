import { cookies } from 'next/headers';

async function getData() {
  // const { data, error, isLoading } = useSWR('/api/session', (url) =>
  //   fetch(url).then((res) => res.json()),
  // );
  const endPoint = 'http://localhost:3000/api/session';
  const getCookie = async (name: string) => {
    return cookies().get(name)?.value ?? '';
  };
  const cookieKey = 'pb_auth';

  const cookie = await getCookie(cookieKey);
  const options = {
    headers: {
      cookie: `${cookieKey}=${cookie};`,
    },
  };

  const res = await fetch(endPoint, options);

  return await res.json();
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
