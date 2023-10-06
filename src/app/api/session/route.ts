import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import { cookieParse, cookieSerialize } from 'pocketbase';

export async function GET(req: NextRequest) {
  // console.log();
  // const response = NextResponse.next();
  const pb = new PocketBase('http://127.0.0.1:8090');

  // load the store data from the request cookie string
  // const cookie = req.cookies.get('pb_auth')
  const cookie = req.cookies.get('pb_auth');

  if (cookie === undefined) {
    // throw new Error('no cookie');
    return NextResponse.json({
      errorMessage: 'no cookie',
    });
  }

  const pb_auth = cookieSerialize(cookie.name, cookie.value);
  // let cookies: string;
  const responseHeaders = new Headers();

  pb.authStore.loadFromCookie(pb_auth || '');
  console.log();

  pb.authStore.onChange(() => {
    const resCookie = pb.authStore.exportToCookie({ httpOnly: false });
    if (resCookie) {
      // console.log(resCookie);
      responseHeaders.set('set-cookie', resCookie);
      // response.cookies.set('show-banner', 'false');
      // res.cookies.set('pb_auth', resCookie);
      // res.cookies.set('name', 'prime', { httpOnly: false });
      // console.log(res.);
      console.log('storage change');
    }
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
    return NextResponse.json({
      errorMessage: 'failed to authenticate',
    });
  }

  const userRequest = await pb.collection('users').getList(1, 5);

  return NextResponse.json(
    {
      pb: pb.authStore.isValid,
      cookie: pb_auth,
      username: pb.authStore.model,
      userRequest,
    },
    { headers: responseHeaders },
  );
}

// async function initPocketBase(req: NextRequest, res: NextResponse) {
//   // const pb = new PocketBase('http://127.0.0.1:8090');

//   // load the store data from the request cookie string
//   pb.authStore.loadFromCookie(req?.headers?.cookie || '');

//   // send back the default 'pb_auth' cookie to the client with the latest store state
//   pb.authStore.onChange(() => {
//     res?.setHeader('set-cookie', pb.authStore.exportToCookie());
//   });

//   try {
//     // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
//     pb.authStore.isValid && (await pb.collection('users').authRefresh());
//   } catch (_) {
//     // clear the auth store on failed refresh
//     pb.authStore.clear();
//   }

//   return pb;
// }

// export async function getServerSideProps({ req, res }) {
//   const pb = await initPocketBase(req, res);

//   // fetch example records...
//   const result = await pb.collection('example').getList(1, 30);

//   return {
//     props: {
//       // ...
//     },
//   };
// }
