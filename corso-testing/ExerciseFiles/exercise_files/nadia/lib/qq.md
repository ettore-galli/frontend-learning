Hi again...I am struggling with a few problems understanding the mock mechanism.



I have three questions, all related by the same code.



I started struggling with the exercises, so I built a much simpler class that is able to reproduce exactly the issues I have:





`statistics.js:`





```javascript



const { sum } = require("lodash");



function total(samples) {

return sum(samples)

}



function average(samples) {

return module.exports.total(samples) / samples.length

}





module.exports = { total, average };





```



Then, its tests:





`statistics.test.js`







```js



describe("test-average-1", () => { // This *WORKS*

let statistics;



beforeAll(() => {

statistics = require('./statistics');

jest.spyOn(statistics, "total").mockImplementation(_ => 150);

});



it("does-average-1", () => {

expect(statistics.average([1, 2, 3])).toBe(50);

});



});





describe("test-average-2", () => { // This *FAILS*

let statistics;

let original;



beforeAll(() => {

jest.mock('./statistics', () => {

const actual = jest.requireActual('./statistics');

return {

...actual,

total: jest.fn().mockReturnValue(150)

}

})

console.log("statistics ==> ", statistics)

statistics = require('./statistics');

});



afterAll(() => {

jest.unmock("./statistics")

})



it("does-average-2", () => {

expect(statistics.total([1, 2])).toBe(150);

expect(statistics.average([1, 2])).toBe(75);

});



});





```



The questions are:



1. Test "test-average-1" *works*, but in order to make it work I had to refer to module.exports in function average [```return module.exports.total(samples) / samples.length] as seen in the lecture.



Is there any way to avoid this, is there another technique that saves me from modifying the code in order to test it?

Or, is there another way to write the code that does not suffer from this problem?

Could you please clarify how the resolution of mocked objects work, especially related to mocks and substitutions?





2. [Given the version of code that makes the previous test work, i.e. *with* module.exports.total(samples)]

In "test-average-2" tried hard to mock the total function and then using the average hoping it would use the mocked version of total but without success;



the symptom is that the actual total function is called, and not the mocked one. (assertion error with the actual value being the right value calculated by the function total)



Is the use of spy or the direct substitution that you show in your videos the only other possible way of doing this in similar cases?



What is wrong in using jest.mock and the requireActual?



3. I have set up the mock this way, with a *single* arrow function:



```js

jest.mock('./statistics', () => {

[...]

})

```



This makes at least the first asserion to work:



```expect(statistics.total([1, 2])).toBe(150);````



If I try the double arrow function you show in the videos:```js



jest.mock('./statistics', () => () => {



[...]



})



``` 

the first assertion fails with the error "TypeError: statistics.total is not a function".



Could you please go deeper explaining the roles of the double constructor in your examples? It seems that the stack of objects crrated is not very clear to me...



Thank you in advance