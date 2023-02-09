import async from "async";

const main = () => {
  // Define the first task to be performed in parallel
  var task1 = function(callback) {
    console.log('Task 1 started');
    setTimeout(function() {
      console.log('Task 1 completed');
      callback(null, "RESULT 1");
    }, 1000);
  };

  // Define the series of tasks to be performed in the waterfall
  var task2 = [
    function(callback) {
      console.log('Task 2-1 started');
      setTimeout(function() {
        console.log('Task 2-1 completed');
        callback(null, "RESULT 2");
      }, 500);
    },
    function(result, callback) {
      console.log('Task 2-2 started');
      setTimeout(function() {
        console.log('Task 2-2 completed');
        callback(null, [result, "RESULT 2"]);
      }, 1000);
    },
  ];

  // Perform the tasks in parallel
  async.parallel([
    task1,
    (callback) => {
      async.waterfall(task2, function(err, result) {
        callback(err, result);
      });
    }], (err, results) => {
      if (err) {
        console.error("Error : ", err);
      } else {
        console.log('Tasks performed in parallel:', results);
      }
    });
}
main();