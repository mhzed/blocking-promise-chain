
export class BlockingPromiseChain {
  private readonly max: number;
  private chain : Array<Promise<void>> = [];
  
  constructor(max: number) {
    this.max  = max;
  }

  /**
   * Add a promise to the chain, blocks if chain size exceeds max set by constructor, unblocks when chained
   * promises are resolved.
   *
   * @param {Promise<void>} p
   * @returns {Promise<void>}
   */
  async add(p: Promise<any>) : Promise<void> {
    while (this.chain.length >= this.max) {
      await this.chain.shift();
    }
    this.chain.push(p);
  }
  
  get length() : number {
    return this.chain.length;
  }

  /**
   * Wait until chain is empty
   * 
   * @returns {Promise<void>}
   */
  async flush() : Promise<void> {
    while (this.chain.length > 0) {
      await this.chain.shift();
    }
  }
}