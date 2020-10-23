const { printTitle } = require('./Estudos/Academind/util');

const button = document.querySelector('button');

button.addEventListener('click', printTitle);

exports.printTitle = printTitle;