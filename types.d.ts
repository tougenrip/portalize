import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & {id:string; stripeCustomerId: string; isActive:boolean;};
    }
    interface User extends DefaultUser {
        id:unknown;
        stripeCustomerId: string;
        isActive:boolean
    }
}