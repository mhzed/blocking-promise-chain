blocking-promise-chain
--------

A chain of promises that blocks when a limit is reached.  This is useful in an async function to easily keep an 
outstanding number of promises running (to keep target busy) in a for loop.  See usage below for examples:

### Usage

Say you have a loop that's doing some external IO:

    async function worker() {
      for (const data of allMyData) {
        await request.post(serverUrl, data);
      }
    }

Nothing wrong here, except that the next post starts only when previous post is finished.  To keep server fully busy, 
we should maintain a queue of outstanding requests.  So the code becomes:


    import {BlockingPromiseChain} from 'blocking-promise-chain';
    const MaxQueuedRequest = 10;
    
    async function worker() {
      let chain = new BlockingPromiseChain(MaxQueuedRequest);
      for (const data of allMyData) {
        await chain.add(request.post(serverUrl, data));
      }
      await chain.flush();    // ensure all outstanding requests are finished
    }

Simple as that.