import NextAuth, { DefaultUser } from "next-auth";

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
        avatarUrl:string;
        active:boolean;
        subscriptionID:string;
        subscriptionEnd:number;
        subscriptionName:string;
        storageQuota:number;
        usedQuota:number;
      }
      export interface Session extends DefaultSession {
        user?: DefaultUser & User;
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
        bDay:Date;
        avatarUrl:string;
        active:boolean;
        subscriptionID:string;
        subscriptionEnd:number;
        subscriptionName:string;
      }
  }