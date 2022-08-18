let inputFields = document.querySelectorAll("input");
const submitBtn = document.getElementById("submit-button");
const submitForm = document.getElementById("submit-form");
const pokazBtn = document.getElementById("pokaz-button");
let formData = []; //pusty objekt

function pokaz() {
    formData.forEach((e) => {
        alert(e);
    });
}
function checkRequirementInputs() {
    let len = inputFields.length;
    let emp = "";
    for (let i = 0; i < len; i++) {
        emp = inputFields[i].value;
        if (emp == "") {
            return false;
        } else {
            return true;
        }
    }
}
//adding div to body
function wklej() {
    let html = `<div class="wklejka" id="wklejka">
    <p>liczba parametrów: ${inputFields.length} </p>
    <p>parametr 0: ${inputFields[0].id}  ${inputFields[0].value}</p>
    <p>parametr 1: ${inputFields[1].id}  ${inputFields[1].value}</p>
    <p>parametr 2: ${inputFields[2].id} ${inputFields[2].value}</p>
    <p>parametr 3: ${inputFields[3].id} ${inputFields[3].value}</p>
    <p>parametr 4: ${inputFields[4].id} ${inputFields[4].value}</p>
    <p>parametr 5: ${inputFields[5].id} ${inputFields[5].value}</p>
    <p>parametr 6: ${inputFields[6].id} ${inputFields[6].value}</p>
    <p>parametr 7: ${inputFields[7].id} ${inputFields[7].value}</p>
    <p>parametr 8: ${inputFields[8].id} ${inputFields[8].value}</p>
    <p>parametr 9: ${inputFields[9].id} ${inputFields[9].value}</p>
    <p>parametr 10: ${inputFields[10].id} ${inputFields[10].value}</p>
    <br><button class="delete-button" id="delete-button"  type="button">Kasuj</button></div>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", html);
    let kasujBtn = document.getElementById("delete-button");
    kasujBtn.addEventListener("click", deleteCard);
} //inserting data from localstore to div

function insertDataFromLocalStoreToDiv() {
    formData = JSON.parse(localStorage.getItem("formData")) || [];
    if (formData.length > 0) {
        let len = formData.length - 1;
        let fullString = "";
        for (let i = 0; i < formData[len].length - 1; i++) {
            let inputField = document.querySelectorAll("input").item(i);
            let string = `<label class="label"><br>${
                inputField.id
            }</br><p class="${inputField.className}">${
                formData[len][i + 1]
            }</p></label>`;
            fullString = fullString + string;
        }
        let html =
            `<div class="submit-history-card">` +
            fullString +
            `<br><button class="delete-button" id="${formData[len][0]}" type="button">Delete</button></div>`;

        document.querySelector("body").insertAdjacentHTML("beforeend", html);
        let delBtn = document.getElementById(`${formData[len][0]}`);
        delBtn.addEventListener("click", (e) => deleteCard(e));
    }
    pokaz();
}

// remove div form body
function deleteCard() {
    const div = document.getElementById("wklejka");
    div.remove();
}

// save whole form to localstore
function zapiszDoLocalStorage() {
    if (checkRequirementInputs() == true) {
        let data = [];
        let len = formData.length;
        let id = 0;
        if (len > 0) {
            id = formData[len - 1][0];
        }
        data[0] = id + 1;
        for (let i = 0; i < inputFields.length; i++) {
            data[i + 1] = inputFields[i].value;
        }
        formData[len] = data;
        localStorage.setItem("formData", JSON.stringify(formData));
        submitForm.reset();
    }
}

//get latest date from localstore
function getLatestData() {
    formData = JSON.parse(localStorage.getItem("formData")) || [];
    if (formData.length > 0) {
        let len = formData.length - 1;

        for (let i = 0; i < formData[len].length - 1; i++) {
            document.querySelectorAll("input").item(i).value =
                formData[len][i + 1];
        }
    }
}

function loadData() {
    formData.forEach((e) => {
        insertDataFromLocalStoreToDiv(e);
    });
}

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
submitBtn.addEventListener("click", zapiszDoLocalStorage);
pokazBtn.addEventListener("click", insertDataFromLocalStoreToDiv);
//window.onload = loadData();
