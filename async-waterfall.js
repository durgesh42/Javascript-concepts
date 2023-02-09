import async from "async";

async.waterfall(
  [
    function (callback) {
      if (true) {
        const error = new Error('Dummy Error')
        callback(error)
      } else {
        console.log("1st Function of Array");
        console.log("1st Function of Array callback Function : ", callback);
        callback(null, 5);
      }
    },
    function (arg1, callback) {
      console.log("3rd Function of Array : Arg1 : ", arg1);
      callback(null, arg1, 1);
    },
    function (arg1, arg2, callback) {
      console.log("2nd Function of Array : Arg1 : ", arg1);
      console.log("2nd Function of Array : Arg2 : ", arg2);
      callback(null, arg1 + arg2);
    },
  ],
  function (err, result) {
    if (err) console.log(err.message);
    else console.log(result);
  }
);
