function handleInput(event, dataSetter) {
  if (!event.target.validity.valid) {
    event.target.nextSibling.textContent = event.target.validationMessage;
    event.target.nextSibling.style.visibility = "visible";
    event.target.classList.add("signform__input_invalid");
  } else {
    event.target.nextSibling.style.visibility = "hidden";
    event.target.classList.remove("signform__input_invalid");
  }

  dataSetter(event.target.value);
}

export default handleInput;
