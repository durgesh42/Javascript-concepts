import async from "async";

async.series(
  [
    function functionOne(callback) {
      callback(null, "RESULT OF FUNCTION ONE");
    },
    function functionTwo(callback) {
      callback("I just want to throw error");
    },
    function functionThree(callback) {
      callback(null, "RESULT OF FUNCTION Three");
    },
  ],
  function (err, result) {
    try {
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
);
