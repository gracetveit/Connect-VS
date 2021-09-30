declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT: string;
    }
  }
}

export {};
