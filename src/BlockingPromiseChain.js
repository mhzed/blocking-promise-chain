"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingPromiseChain {
    constructor(max) {
        this.chain = [];
        this.max = max;
    }
    /**
     * Add a promise to the chain, blocks if chain size exceeds max set by constructor, unblocks when chained
     * promises are resolved.
     *
     * @param {Promise<void>} p
     * @returns {Promise<void>}
     */
    add(p) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.chain.length >= this.max) {
                yield this.chain.shift();
            }
            this.chain.push(p);
        });
    }
    get length() {
        return this.chain.length;
    }
    /**
     * Wait until chain is empty
     *
     * @returns {Promise<void>}
     */
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.chain.length > 0) {
                yield this.chain.shift();
            }
        });
    }
}
exports.BlockingPromiseChain = BlockingPromiseChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvY2tpbmdQcm9taXNlQ2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCbG9ja2luZ1Byb21pc2VDaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7SUFJRSxZQUFZLEdBQVc7UUFGZixVQUFLLEdBQTBCLEVBQUUsQ0FBQztRQUd4QyxJQUFJLENBQUMsR0FBRyxHQUFJLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0csR0FBRyxDQUFDLENBQWU7O1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNHLEtBQUs7O1lBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXBDRCxvREFvQ0MifQ==