import * as nodeunit from 'nodeunit';
import {BlockingPromiseChain} from "..";

const sleep = (ms: number) : Promise<void> => {
  return new Promise((resolve, reject)=>{
    setTimeout(resolve, ms);
  })
}
exports.testChain = (test: nodeunit.Test) => {
  (async function(){
    let chain = new BlockingPromiseChain(2);
    for (let x of [1,2,3]) {
      let t1 = Date.now();
      await chain.add(sleep(50));
      let elapsed = Date.now() - t1;
      if (x<=2) { 
        test.ok(elapsed < 5, "no block when chain is not full");
        
      } else {
        test.ok(elapsed > 40, "block when chain is full");
      }
    }
  })().catch(test.ifError).then(test.done);
}

exports.testFlush = (test: nodeunit.Test) => {
  (async function(){
    let chain = new BlockingPromiseChain(1);
    for (let x of [1,2,3]) {
      await chain.add(sleep(50));
    }
    test.ok(chain.length > 0, "has outstanding request");
    await chain.flush();
    test.ok(chain.length == 0, "flushed");

  })().catch(test.ifError).then(test.done);
}
