import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Extend the Session and User types to include the idToken
declare module 'next-auth' {
  interface User {
    idToken?: string
  }
  interface Session {
    idToken?: string | undefined
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        (() => {
          throw new Error('GOOGLE_CLIENT_SECRET is not defined')
        })(),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email',
        },
      },
    }),
  ],
  callbacks: {
    // Store the Google id_token in the JWT
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
    // Add the id_token to the session
    async session({ session, token }) {
      session.idToken = token.idToken as string
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
})

export default handlers
