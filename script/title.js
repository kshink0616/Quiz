setup();

const $start = document.getElementById("startButton");
$start.addEventListener("click", () => startQuiz());

const $okButton = document.getElementById("okButton");
$okButton.addEventListener("click", () => configConfirm());

//-----------------

function setup() {
    const colorIdentifier = sessionStorage.getItem("colorTheme")
    const $titleBody = document.getElementById("titleBody");

    if(colorIdentifier === "B") {
        $titleBody.setAttribute("style", "background-color: #add8e6;");
    } else if (colorIdentifier === "R") {
        $titleBody.setAttribute("style", "background-color: #d8bfd8;");
    } else if (colorIdentifier === "Y") {
        $titleBody.setAttribute("style", "background-color: #eee8aa;");
    } else {
        $titleBody.setAttribute("style", "background-color: aquamarine;");
    }
}

function startQuiz() {
    changeTitleText();
    setTimeout(function() {
        window.location.href = "quiz.html";
    }, 600)
}

function changeTitleText() {        //Ready GOを表示
    const $titleText = document.getElementById("titleText");
    $titleText.textContent = "Ready GO!!"
    $titleText.style.color = "red";
}

function configConfirm() {
    const $scoreConfig = document.getElementById("scoreConfig");
    let scoreDisplayFlag = $scoreConfig.checked;

    const $rankConfig = document.getElementById("rankConfig");
    let rankDisplayFlag = $rankConfig.checked;

    const $colorThemeConfig = document.getElementById("colorThemeConfig");
    let colorTheme = $colorThemeConfig.value;

    sessionStorage.setItem("scoreDisplayFlag", scoreDisplayFlag);
    sessionStorage.setItem("rankDisplayFlag", rankDisplayFlag);
    sessionStorage.setItem("colorTheme", colorTheme);
    setup();
}
