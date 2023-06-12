// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const gameContainer = document.getElementById("game-container");
const thankYouContainer = document.getElementById("thankYouContainer");
const submitButton = document.getElementById("submit");
submitButton.disabled = true;

const geschlechtField = document.getElementsByName("geschlecht");
var geschlechtFieldWert;
const vornameField = document.getElementById("vorname");
const nachnameField = document.getElementById("nachname");
const emailField = document.getElementById("email");
const phonenumberField = document.getElementById("phonenumber")

// (2) Interaktionen festlegen
emailField.addEventListener("keyup", () => {
  onChangeEmailField();
});
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});

geschlechtField.addEventListener("click", () => {
  radioButtonValue();
});

// (3) Interaktionen Code
const onChangeEmailField = () => {
  if (emailField.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};
const radioButtonValue = () => {
for (var i = 0; i < geschlechtField.length; i++) {
  if (geschlechtField[i].checked) {
    geschlechtFieldWert = geschlechtField[i].value;
  }
}
};

const onClickSubmit = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "b4", // SQL Gruppen Namen
    pw: "49637c97", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank

    columns: {
      // "email" Name der Spalte in der SQL Tabelle
      // "emailField.value" Eingabe des Benutzers aus dem Formularfeld
      geschlecht: geschlechtFieldWert,
      vorname: vornameField.value,
      nachname: nachnameField.value,
      email: emailField.value,
      phonenumber: phonenumberField.value
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, das Game erscheint
  formContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
};


/*
var test = false;

if (test == false) {
  submitButton.disabled = false;
}*/
