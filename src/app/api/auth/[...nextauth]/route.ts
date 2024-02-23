import axios from "axios";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      issuer: process.env.ISSUER as string,
      accessTokenUrl: process.env.ACCESS_TOKEN_URL as string,
      requestTokenUrl: process.env.REQUEST_TOKEN_URL as string,
      jwks_endpoint:
        process.env.JWKS_ENDPOINT as string,
    }),
  ],
};

const handler = NextAuth({
  ...authOptions,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 , // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
  },
  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    async session({ session, user, token }) {
      if (token) {

        // @ts-ignore
        session.access_token = token.access_token;
        // @ts-ignore
        session.refresh_token = token.refresh_token;
        // @ts-ignore
        session.providerAccountId = token.providerAccountId;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {

      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.providerAccountId = account.providerAccountId;
        token.idToken = account.id_token
      }
      return token;
    },
  },

  events: {
    async signOut({ session, token }) {
          await axios
        .get(
          `${process.env.URL_LOGOUT}${token.idToken}`
        )
        .then(() => {})
        .catch((erro) => {});
    },
    signIn(message) {      
    },
    session(message) {
    
    },
  },
});

export { handler as GET, handler as POST };
