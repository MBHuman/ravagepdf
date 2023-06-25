

// export type RavageEndpoint = () => boolean;

export interface IRavageEndpoint {
  execute(): void;
}

export abstract class RavageEndpointBase implements IRavageEndpoint {
  public abstract execute(): void;
}

export class RavageEndpoint extends RavageEndpointBase {
  public execute(): void {
    throw new Error("Method not implemented.");
  }
}

// RavageExtension is a chainable behavior modifier for RavageEndpoints.
// eslint-disable-next-line no-unused-vars
export type RavageExtension = (endpoint: RavageEndpoint) =>
  Promise<RavageEndpoint>;


// chain is a helper function for composing RavageExtensions. Requests will
// traverse them in the order they're declared. That is, 
// the first RavageExtension is treated as the outermost RavageExtension.
export async function chain(
  outer: RavageExtension,
  ...others: RavageExtension[]
): Promise<RavageExtension> {
  return async function (next: RavageEndpoint): Promise<RavageEndpoint> {
    for (let i = others.length - 1; i >= 0; i--) {
      next = await others[i](next);
    }
    return outer(next);
  };
}


export interface IRavageFailer {
  failed(): Error;
}