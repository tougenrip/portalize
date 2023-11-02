export declare global{
    namespace NodeJS{
        interface ProcessEnv{
            NODE_ENV: "development" | "production"
        }
    }
    interface Window {
        hello: any;
      }
}