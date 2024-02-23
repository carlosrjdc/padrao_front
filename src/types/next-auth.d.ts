import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        access_token:string,
        expires: DateTime,
        providerAccountId:string,
        refresh_token:string,
        user:{
            email:string,
            name:string,
        }
    }
}