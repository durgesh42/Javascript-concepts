# async.waterfall, async.series VS async & await 
___

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



&nbsp;


# Object.assign()
___


<b style="color:White;font-size:14px">Date :- &nbsp; 3 : Jan : 23</b>


- The ```Object.assign()``` method is used to copy the values and properties from one or more source objects to a target object. 
  
- It invokes getters and setters since it uses both [[Get]] on the source and [[Set]] on the target. 
  
- It returns the target object which has properties and values copied from the source object. Object.assign() does not throw on null or undefined source values. 


<strong>Syntax:</strong>

```javascript
Object.assign(target, ...sources)
Parameters: 
```

- <strong>target:</strong> It is the target object to which values and properties have to be copied.
- <strong>Sources:</strong> It is the source object from which values and properties have to be copied.
- <strong>Return Value:</strong> Object.assign() returns the target object.


&nbsp;


# async.parallel()
___


<b style="color:White;font-size:14px">Date :- &nbsp; 9 : Jan : 23</b>

```javascript
import async from "async";

// an example using an object instead of an array
async.parallel(
  {
    one: function (callback) {
      callback("unable to execute");
    },
    two: function (callback) {
      callback(null, "two");
    },
    three: function (callback) {
      callback(null, 3);
    },
  },
  function (err, results) {
    if (err) console.log(err);
    console.log(results);
  }
);



async.parallel(
  [
    function (callback) {
      callback(null, 1);
    },
    function (callback) {
      callback(null, 2);
    },
    function (callback) {
      callback("unable to execute");
    },
    function (callback) {
      callback(null, 4);
    },
  ],
  function (err, results) {
    if (err) console.log(err);
    console.log(results);
  }
);

```



- `async.parallel()` is a utility function from the async library that allows us to run multiple functions in parallel and collect their results.

- The `async.parallel()` function takes two arguments:
  - An object that maps the names of the functions you want to run in parallel to the functions themselves
  - A callback function that will be called once all of the functions have completed or if an error occur.
  - In place of sending a object that maps we can send array of functions also.

1. In this example, the `async.parallel()` function is being passed an object that contains four functions: one, two, three, four.

2. <b>These functions all take a single argument, which is a callback function. When a function is done executing, it should call this callback function, passing in any errors as the first argument and any results as the second argument.</b>

- In the case of one function, it calls the callback with the string "unable to execute" as the error argument, and two calls the callback with null and the string "two" as the result. three and four are similar and they call the callback with null and 3 and "four" respectively.

- Once all of these functions have completed or if an error occur, the final callback function that was passed as the second argument to async.parallel() will be called. This callback takes two arguments: an error and a results object.

- <b>If any of the parallel functions passed an error to its callback, then the error argument passed to the final callback will be the error passed by the first function that was passed an error.</b>

-  <b>If all the parallel functions passed null as the first argument to the callback function, then the error argument will be null.</b>

- <bold style="color:red">The results object that is passed as the second argument to the final callback is an object that contains the results from all of the functions that were passed to async.parallel(), with the keys being the names of the functions and the values being the results passed to the callback functions</bold>


- In this example, the function three calls its callback with an error "unable to execute", as soon as this error is passed to the callback, async.parallel invokes the final callback and passes the error "unable to execute" to it, thus halting the execution of any remaining functions in the parallel set.'

- As a result, the final callback function that was passed as the second argument to async.parallel() will be called with err set to the string "unable to execute" and results set to an object containing the results of the completed function `{ one: 1, two: 2, three: undefined }.`
