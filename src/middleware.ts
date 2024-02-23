import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        //@ts-ignore
        if (token) {
          return true;
        } else {
          return false;
        }
      },
    },
  }
);
//export const config = { matcher: ["/ver"] };
export const config = { matcher: [ '/((?!login).*)', ] }
