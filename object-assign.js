const target = { A: 5, a: 10, payload: { id: 1, msg: 55 } };

const source1 = { a: 100, b: 2 };
const source2 = { c: 3, d: 4 };
const source3 = { e: 5, f: 6, payload: { id: 2, msg: 550 } };

console.log("Target : ", target);

const returnedTarget = Object.assign(target, source1, source2, source3);

console.log("New Target : ", target);
console.log("ReturnedTarget : ", returnedTarget);
console.log("returnedTarget === target : ", returnedTarget === target);
