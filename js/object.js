const student={
    name: "Arun",
    age:21,
    regno: 91,
    marks:[85,90,91,80,89],
    greet: function(){
        console.log("Hello, "+this.name);
    }
};
console.log(student.name);
console.log(student["age"]);
student.greet();

console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));

const newstudent={...student,age:21};
console.log(newstudent);


