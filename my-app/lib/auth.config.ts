import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Google({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENTSECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session, token }) {

            if (session != null && token != null) {
                await fetch(process.env.NEXT_PUBLIC_APP_URL!, {
                    method: "POST", credentials: "include", body: JSON.stringify({
                        name: session.user.name,
                        id: token.sub
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            return ({

                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            })
        },

    },
} satisfies NextAuthConfig