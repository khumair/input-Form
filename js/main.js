// input field Array
const inputFields = [
  { inputField : 'Enter First Name'},
  { inputField : 'Enter Second Name'},
  { inputField : 'Enter Email ID', pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ },
  { inputField : 'choose Password', type: 'password'}
];

// Transition Time on wrong entery
const vibrateTime = 100;
const switchTime = 200;

let position = 0 ;

// Initalize the DOM Element
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputElement = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

// Events
document.addEventListener("DOMContentLoaded", getInputField);

// Click event on Next button
nextBtn.addEventListener('click', validate);


// Execute a function when the user releases a key on the keyboard
inputElement.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      validate();
    }
  });
// function

function getInputField() {
  inputLabel.innerHTML = inputFields[position].inputField;
  inputElement.type = inputFields[position].type ||'text';
  inputElement.value = inputFields[position].answer || '';
  inputElement.focus();

  progressBar.style.width = (position * 100) / inputFields.length + '%';
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
  //
  showInputField();
  // alert('hello');
}

function showInputField(){
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = 0;
  inputProgress.style.width = '100%';
}

function hideInputField() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = 'none';
}

function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
     // alert('hello');
}

function validate() {
  if (!inputElement.value.match(inputFields[position].pattern || /.+/))
  {
    // alert('hello1');
    inputFail();

  }
  else {
    inputPass();
      }
}

function inputFail() {
  formBox.className ='error';
  for(let i = 0; i < 4; i++)
  {
    setTimeout(transform, vibrateTime * i, ((i % 2) * 2 - 1 ) * 20 , 0 );
    setTimeout(transform, vibrateTime * 4 , 0 , 0);
    inputElement.focus();
  }
}

function inputPass() {
  inputFields[position].answer = inputElement.value;
  formBox.className = '';
  setTimeout(transform, vibrateTime * 0 , 0 , 10);
  setTimeout(transform, vibrateTime * 1 , 0 , 0);
  position++;
  if(inputFields[position]){
    hideInputField();
    getInputField();
  }
  else {
    hideInputField();
    formBox.className = 'close';
    progressBar.style.width = '100%';
    formComplete();
  }
}

function formComplete() {
  console.log(inputFields);
  let nameField = inputFields[0].answer ;
  document.getElementById("modal").style.display = "";
  document.getElementById("msg").innerHTML = 'Thank you ' + nameField + ' for the registeration. We will contect you on given email ID: '+ inputFields[2].answer ;

  $(".open-modal").on("click", function(event){
  event.preventDefault();
  event.stopPropagation();
  $("#modal").show("closed");
//  document.getElementById("msg").innerHTML = "Thank you ";
});

$("button").on("click", function(){
  $("#modal").fadeOut();
});

$(".modal-container").on("click", function(){
  $("#modal").fadeOut();
});
  // alert('Thank you ');
  // alert("Hello world!");


  }





// $("#modal").hide();
// $("#prompt").hide();
//
// $(".open-modal").on("click", function(event){
//   event.preventDefault();
//   event.stopPropagation();
//   $("#modal").show("closed");
// });
//
// $("button").on("click", function(){
//   $("#modal").fadeOut();
// });
//
// $(".modal-container").on("click", function(){
//   $("#modal").fadeOut();
// });
//
// $(".open-prompt").on("click", function(event){
//   event.preventDefault();
//   event.stopPropagation();
//   $("#prompt").show("closed");
// });
//
// $("#btn-cancel").on("click", function(){
//   $("#prompt").fadeOut();
// });
// $("#btn-ok").on("click", function(){
//   $("#prompt").fadeOut();
// });
