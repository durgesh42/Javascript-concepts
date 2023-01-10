import async from "async";

// an example using an object instead of an array
async.parallel(
  {
    one: function (callback) {
      callback(null, 1);
    },
    two: function (callback) {
      callback(null, 2);
    },
    three: function (callback) {
      try {
      } catch (error) {
        callback("unable to execute");
      }
    },
    four: function (callback) {
      callback(null, 4);
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
      callback("unable to execute");
    },
    function (callback) {
      callback(null, "two");
    },
    function (callback) {
      callback(null, 3);
    },
    function (callback) {
      callback(null, "four");
    },
  ],
  function (err, results) {
    if (err) console.log(err);
    console.log(results);
  }
);
