import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}
showHello("greeting", "Бердичева");

console.log('11')
console.log('22')
console.log('33')
