const person = require("../src/ps.js").per;

let personOne = new person("keyhan","computer programmer");
let personTwo = new person("alireza","ai developer");



personOne.newPublish( {
    title:"what is the javascript engine",
    readTime:2,
    description:"lab lab lab"
});

personTwo.subscribe(personOne);


console.log("------------------------------------------------------------------------------------------");




personTwo.listenOn(personOne,personTwo.getSubs(),personTwo.getSubs()[0].id);

personOne.newPublish( {
    title:"another from the keyhan",
    readTime:200,
    description:"this is cs50 and this great day"
});



console.log(personTwo.getSubs()[0].body.personPubs);




console.log("------------------------------------------------------------------------------------------");

personOne.newPublish( {
    title:"this is some articls about the stanford",
    readTime:200,
    description:"some article on ai in the staford univeristy"
});


console.log(personTwo.getSubs()[0].body.personPubs);



console.log("------------------------------------------------------------------------------------------");

personOne.newPublish( {
    title:"somethings from the ai",
    readTime:200,
    description:"new research from the google"
});

console.log(personTwo.getSubs()[0].body.personPubs);


console.log("------------------------------------------------------------------------------------------");


// deepEquality is sucess full
// let res = personTwo.deepEquality({name:"kfeyhan",age:23},{name:"keyhan",age:23})
// console.log(res)








// generate hash successfull
// console.log(personTwo.generateHash(Math.random(0,3000)));

