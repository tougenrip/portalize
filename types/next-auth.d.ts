import NextAuth, { Account, DefaultUser } from "next-auth";

import { ModelViewerElement } from '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': Partial<ModelViewerElement>;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    username?: string | null
  }
}

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        stripeCustomerId: string;
        isActive:boolean;
        skyEnabled:boolean;
        bannerEnabled:boolean;
        isDev:boolean;
        rpmId:string;
        gender:string;
        bDay:Date;
        friends:Array<string>;
        avatarUrl:string;
        active:boolean;
        accounts:Account;
        subscriptionID:string;
        subscriptionEnd:number;
        subscriptionName:string;
        storageQuota:number;
        usedQuota:number;
      }
      export interface Session extends DefaultSession {
        user?: DefaultUser & User;
        account: Account
      }
      interface AdapterUser extends DefaultUser {
        id: string;
        stripeCustomerId: string;
        isActive:boolean;
        skyEnabled:boolean;
        bannerEnabled:boolean;
        isDev:boolean;
        rpmId:string;
        gender:string;
        friends:Array<string>;
        bDay:Date;
        avatarUrl:string;
        active:boolean;
        accounts:Account;
        subscriptionID:string;
        subscriptionEnd:number;
        subscriptionName:string;
      }
  }