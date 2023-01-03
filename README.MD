# Comparison of async.waterfall, async.series, and async/await 

<b style="color:White;font-size:14px">Date :- &nbsp; 3 : Jan : 23</b>


### Async.waterfall and async.series are two functions in the async library that can be used to run a series of functions in an asynchronous manner.


### async.waterfall

- Async.waterfall runs an array of functions in series, each passing their results to the next function in the array. 
  
- It is useful for performing a series of operations where the output of each function is needed as the input for the next.
   

```javascript
async.waterfall([
  function(callback) {
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
  },
  function(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
  }
], function (err, result) {
   // result now equals 'done'
});
```


### async.series

- Async.series runs an array of functions in series, each running only after the previous function has completed. 
  
- It is useful for performing a series of operations where each function must be run in order and their results are not dependent on each other.

```javascript
async.series([
  function(callback) {
    // do something
    callback(null, 'one');
  },
  function(callback) {
    // do something
    callback(null, 'two');
  }
],
// optional callback
function(err, results) {
  // results is now equal to ['one', 'two']
});
```

### async/await

- Async/await is a syntax for working with asynchronous code that was introduced in JavaScript with the release of ECMAScript 2017. 
  
- It allows you to write asynchronous code that looks and behaves like synchronous code, using the await keyword to pause the execution of an async function until a promise is resolved.

- Here is an example of using async/await to perform the same tasks as the async.waterfall example above:


```javascript
async function asyncWaterfall() {
  const res1 = await new Promise((resolve, reject) => {
    resolve(['one', 'two']);
  });
  const arg1 = res1[0];
  const arg2 = res1[1];
  const res2 = await new Promise((resolve, reject) => {
    resolve('three');
  });
  const arg3 = res2;
  const result = await new Promise((resolve, reject) => {
    resolve('done');
  });
  return result;
}

asyncWaterfall().then((result) => {
  console.log(result);
});
```



### Conclusion

- Which approach is best - async.waterfall, async.series, or async/await - depends on personal preference and the specific needs of your project. 
  
- Async.waterfall is a good choice if you need to perform a series of operations where the output of each function is needed as the input for the next, and you don't need to wait for any of the functions to complete before starting the next one. 
  
- It can also be easier to read than async/await code in some cases, since the flow of the code is more linear.