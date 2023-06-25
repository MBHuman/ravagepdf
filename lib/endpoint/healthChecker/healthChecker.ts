

export interface IRavageHealthChecker {
    check(): boolean;
}

export abstract class RavageHealthCheckerBase implements IRavageHealthChecker {
    public abstract check(): boolean;
}


export class RavageHealthCheckerV1 extends RavageHealthCheckerBase {
  public check(): boolean {
    throw new Error("Method not implemented.");
  }
}