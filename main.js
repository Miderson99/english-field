
import logo from './public/icon/logo.svg'

// document.querySelector('#app').innerHTML = `
//   <div>
 
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// document.querySelector('.logo').innerHTML = `

// <a href="./">
//     <img src="${logo}" class="logo " alt="JavaScript logo" />     
// </a>

// `

// setupCounter(document.querySelector('#counter'))


let btn = document.querySelector('#btn')
let sidebar = document.querySelector('.sidebar')

btn.onclick = function () {
    sidebar.classList.toggle('active')
}