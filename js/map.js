const nums=[1,2,3];
const squares=nums.map(n=> n*n);
console.log(squares);

function fact(n){
    if(n==0){
        return 1;
    }
    else{
        return n*fact(n-1);
    }
}
const no=[1,3,5];
const n1=no.map(n=>fact(n));
console.log(n1);