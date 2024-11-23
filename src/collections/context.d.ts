import { RequestContext as OriginalRequestContext } from 'payload';

declare module 'payload' {
  export interface RequestContext extends OriginalRequestContext {
    // define context
  }
}
