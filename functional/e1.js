const people = [
    { firstname: "Bill", lastname: "Harold", age: 54 },
    { firstname: "Ana", lastname: "Atkins", age: 42 },
    { firstname: "John", lastname: "Doe", age: 57 },
    { firstname: "Davy", lastname: "Johnson", age: 34 },
];

const parsePeople = (people) => {
    const parsedPeople = [];

    for (let i = 0; i < people.length; i++) {
        people[i].firstname = people[i].firstname.toUpperCase();
        people[i].lastname = people[i].lastname.toUpperCase();
    }

    const compareAges = (person1, person2) => person1.age - person2.age;

    return people.sort(compareAges);
};

const result = parsePeople(people);

console.log(result)
// [
//   {firstname: "DAVY", lastname: "JOHNSON", age: 34},
//   {firstname: "ANA", lastname: "ATKINS", age: 42},
//   {firstname: "BILL", lastname: "HAROLD", age: 54},
//   {firstname: "JOHN", lastname: "DOE", age: 57},
// ]

const people2 = [
    { firstname: "Bill", lastname: "Harold", age: 54 },
    { firstname: "Ana", lastname: "Atkins", age: 42 },
    { firstname: "John", lastname: "Doe", age: 57 },
    { firstname: "Davy", lastname: "Johnson", age: 34 },
];

const mapPerson = person => ({ ...person, firstname: person.firstname.toUpperCase(), lastname: person.lastname.toUpperCase() });
const compareForSort = (person1, person2) => person1.age - person2.age;
const processPeople = people => [...people.map(mapPerson)].sort(compareForSort);

const fresult =  processPeople(people2);
console.log(fresult)