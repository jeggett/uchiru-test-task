const svgNS = 'http://www.w3.org/2000/svg';

const numberToCoord = number => (34 + number * 39);

const createArc = function createArc(start, end, stringId) {
  const xStart = numberToCoord(start);
  const xEnd = numberToCoord(end);
  const xMid = (xStart + xEnd) / 2;

  const myArc = document.createElementNS(svgNS, 'path');

  myArc.setAttributeNS(null, 'id', stringId);
  myArc.setAttributeNS(null, 'd', `M${xStart} 80 Q ${xMid} 30 ${xEnd} 80`);
  myArc.setAttributeNS(null, 'fill', 'transparent');
  myArc.setAttributeNS(null, 'stroke', 'purple');
  myArc.setAttributeNS(null, 'marker-end', 'url(#arrow)');

  document.getElementById('arcsSvg').appendChild(myArc);
};


const createInput = function createInput(start, end, stringId) {
  const xStart = numberToCoord(start);
  const xEnd = numberToCoord(end);
  const xMid = (xStart + xEnd) / 2 - 10;
  const myInput = document.createElement('input');
  myInput.setAttribute('id', stringId);
  myInput.style.left = `${xMid}px`;
  document.getElementById('arcs').appendChild(myInput);
};

const createCaption = function createCaption(start, end, stringId, text) {
  const xStart = numberToCoord(start);
  const xEnd = numberToCoord(end);
  const xMid = (xStart + xEnd) / 2 - 10;
  const myCaption = document.createElement('span');
  myCaption.innerHTML = text;
  myCaption.setAttribute('id', stringId);
  myCaption.style.left = `${xMid}px`;
  document.getElementById('arcs').appendChild(myCaption);
}

const generateRandomBetween = (start, end) => Math.floor(start + Math.random() * (end - start + 1));

class AdditionProblem {
  constructor() {
    this.firstTerm = generateRandomBetween(6, 9);
    this.sum = generateRandomBetween(11, 14);
    this.secondTerm = this.sum - this.firstTerm;
  }
  logProblem() {
    console.log(`${this.firstTerm} + ${this.secondTerm} = ${this.sum}`);
  }
  getProblemString() {
    return `${this.firstTerm} + ${this.secondTerm} = `;
  }
}

// First step
const additionProblem = new AdditionProblem();
$('#problem')
  .append(`<span id="problem-first-term">${additionProblem.firstTerm}</span>`)
  .append('<span> + </span>')
  .append(`<span id="problem-second-term">${additionProblem.secondTerm}</span>`)
  .append('<span> = </span>')
  .append('<span>?</span>');
additionProblem.logProblem(); // log problem wwth console.log
createArc(0, additionProblem.firstTerm, 'first-term-arc');
createInput(0, additionProblem.firstTerm, 'first-term-input');
$('#first-term-input').focus();

$('#first-term-input').on('input', function () {
  let inputValue = $(this).val(); // get the current value of the input field.
  if(inputValue !== '') {
    $('#problem-first-term').addClass('yellowBackground');
  } else {
    $('#problem-first-term').removeClass('yellowBackground');
  }
  if (parseInt(inputValue) === additionProblem.firstTerm) {
    // Second step
    $('#problem-first-term').removeClass('yellowBackground');
    $(this).remove();
    createCaption(0, additionProblem.firstTerm, 'first-term-caption', inputValue);
    createArc(additionProblem.firstTerm, additionProblem.sum, 'second-term-arc');
    createInput(additionProblem.firstTerm, additionProblem.sum, 'second-term-input');
    $('#second-term-input').focus();

    $('#second-term-input').on('input', function () {
      inputValue = $(this).val();
      if(inputValue !== '') {
        $('#problem-second-term').addClass('yellowBackground');
      } else {
        $('#problem-second-term').removeClass('yellowBackground');
      }
      if (parseInt(inputValue) === additionProblem.secondTerm) {
        // Third step
        $('#problem-second-term').removeClass('yellowBackground');
        $(this).remove();
        createCaption(additionProblem.firstTerm, additionProblem.sum, 'second-term-caption', inputValue);
        $('#problem span:last-child').remove();
        $('#problem').append('<input id="problem-input"/>');
        $('#problem-input').focus();

        $('#problem-input').on('input', function () {
          inputValue = $(this).val();
          if (parseInt(inputValue) === additionProblem.sum) {
            $(this).remove();
            $('#problem').append(`<span>${additionProblem.sum}</span>`);
          }
        });
      }
    });
  }
});
