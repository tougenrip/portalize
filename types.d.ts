import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & {_id:string; id:string; stripeCustomerId: string; isActive:boolean;skyEnabled:boolean;bannerEnabled:boolean;image:string;isDev:boolean;rpmId:string;avatarUrl:string;active:boolean};
    }
    interface User extends DefaultUser {
        _id:string;
        id:unknown;
        stripeCustomerId: string;
        isActive:boolean;
        skyEnabled:boolean;
        bannerEnabled:boolean;
        image:string;
        isDev:boolean;
        rpmId:string;
        avatarUrl:string;
        active:boolean
    }
}