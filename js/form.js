// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const gameContainer = document.getElementById("game-container");
const thankYouContainer = document.getElementById("thankYouContainer");

const submitButton = document.getElementById("submit");
submitButton.disabled = true;



function enableSubmit() {
  const requiredFields = document.getElementById("form").querySelectorAll("[required]");
  console.log(requiredFields);
  let isValid = true;
  for (var i = 0; i < requiredFields.length; i++) {
    let changedInput = requiredFields[i];
    if (changedInput.value.trim() === "" || changedInput.value === null) {
      isValid = false;
      break;
    }
  }
  submitButton.disabled = !isValid;
}

const geschlechtField = document.getElementsByName("geschlecht");
radioButtonValue()

const vornameField = document.getElementById("vorname");
const errorMessageVorname = document.getElementById("errorMessageVorname");

const nachnameField = document.getElementById("nachname");
const errorMessageNachname = document.getElementById("errorMessageNachname");

const emailField = document.getElementById("email");
const errorMessageEmail = document.getElementById("errorMessageEmail");

const phonenumberField = document.getElementById("phonenumber");
const errorMessagePhonenumber = document.getElementById("errorMessagePhonenumber");

// (2) Interaktionen festlegen
geschlechtField.forEach((element) => {
  element.addEventListener("click", () => {
    radioButtonValue();
  });
});

vornameField.addEventListener("keyup", () => {
  onChangeVornameField();
  enableSubmit();
});

nachnameField.addEventListener("keyup", () => {
  onChangeNachnameField();
  enableSubmit();
});

emailField.addEventListener("blur", () => {
  enableSubmit();
  onChangeEmailField();
});

phonenumberField.addEventListener("blur", () => {
  enableSubmit();
  onChangePhonenumberField();
});

submitButton.addEventListener("click", onClickSubmit);

// (3) Interaktionsfunktionen
function radioButtonValue() {
  for (let i = 0; i < geschlechtField.length; i++) {
    if (geschlechtField[i].checked) {
      geschlechtFieldWert = geschlechtField[i].value;
      return geschlechtFieldWert;
    }
  }
};

let formValueVornameField;
function onChangeVornameField() {
  formValueVornameField = vornameField.value.trim();
  if (formValueVornameField.length > 2) {
    errorMessageVorname.innerHTML = "";
  } else {
    errorMessageVorname.innerHTML = "Der eingegebene Vorname ist zu kurz.";
  }

};

let formValueNachnameField;
function onChangeNachnameField() {
  formValueNachnameField = nachnameField.value.trim();
  if (formValueNachnameField.length > 2) {
    errorMessageNachname.innerHTML = "";
  } else {
    errorMessageNachname.innerHTML = "Der eingegebene Nachname ist zu kurz.";
  }
};

const emailRegex = /\S+@\S+\.\S+/;
let formValueEmailField;
function onChangeEmailField() {
  formValueEmailField = emailField.value.trim();
  if (formValueEmailField.match(emailRegex)) {
    errorMessageEmail.innerHTML = "";
  } else {
    submitButton.disabled = true;
    emailField.value = "",
      errorMessageEmail.innerHTML = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }
};

const swissPhoneRegex = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
let formValuePhonenumberField;
function onChangePhonenumberField() {
  formValuePhonenumberField = phonenumberField.value.trim();
  if (formValuePhonenumberField.match(swissPhoneRegex)) {
    errorMessagePhonenumber.innerHTML = "";
    formValuePhonenumberField = formValuePhonenumberField.replace(/^0/, '+41');
    formValuePhonenumberField = formValuePhonenumberField.replace(/\s/g, '');
  } else {
    submitButton.disabled = true;
    phonenumberField.value = "";
    errorMessagePhonenumber.innerHTML = "Bitte geben Sie eine gültige Telefonnummer ein.";
  }
};


async function onClickSubmit(event) {
  event.preventDefault();
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "b4", // SQL Gruppen Namen
    pw: "49637c97", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank
    columns: {
      geschlecht: geschlechtFieldWert,
      vorname: formValueVornameField,
      nachname: formValueNachnameField,
      email: formValueEmailField,
      phonenumber: formValuePhonenumberField,
    },
  };

  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, das Game erscheint
  formContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
}
