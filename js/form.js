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
const phonenumberField = document.getElementById("phonenumber");

// (2) Interaktionen festlegen
emailField.addEventListener("keyup", onChangeEmailField);
submitButton.addEventListener("click", onClickSubmit);

geschlechtField.forEach((element) => {
  element.addEventListener("click", () => {
    console.log('OK');
    radioButtonValue();
  });
});

// (3) Interaktionsfunktionen
function onChangeEmailField() {
  if (emailField.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function radioButtonValue() {
  for (let i = 0; i < geschlechtField.length; i++) {
    if (geschlechtField[i].checked) {
      geschlechtFieldWert = geschlechtField[i].value;
    }
  }
}

async function onClickSubmit(event) {
  event.preventDefault();

  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "b4", // SQL Gruppen Namen
    pw: "49637c97", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank
    columns: {
      geschlecht: geschlechtFieldWert.value,
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
}
