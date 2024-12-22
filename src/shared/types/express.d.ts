declare namespace Express {
  interface Request {
    requestId?: string;
    auth?: import("@clerk/express").AuthObject;
  }
}
