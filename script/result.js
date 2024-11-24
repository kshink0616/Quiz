setup();
settingResult();

const $retryButton = document.getElementById("retryButton");
$retryButton.addEventListener("click", () => {
    //window.history.back();
    window.location.href = "quiz.html";
})
const $backButton = document.getElementById("backButton");
$backButton.addEventListener("click", () => {
    window.location.href = "title.html";
})


function setup() {
    const colorIdentifier = sessionStorage.getItem("colorTheme")
    const $body = document.getElementById("body");

    if(colorIdentifier === "B") {
        $body.setAttribute("style", "background-color: #add8e6;");
    } else if (colorIdentifier === "R") {
        $body.setAttribute("style", "background-color: #d8bfd8;");
    } else if (colorIdentifier === "Y") {
        $body.setAttribute("style", "background-color: #eee8aa;");
    } else {
        $body.setAttribute("style", "background-color: aquamarine;");
    }
}


function settingResult() {
    const score = sessionStorage.getItem("score");

    const $scoreDisplay = document.getElementById("scoreDisplay");
    $scoreDisplay.textContent = score;

    const $rankDisplay = document.getElementById("rankDisplay");
    $rankDisplay.textContent = getRank(score);
}

function getRank(score) {
    score = parseInt(score);
    if(score === 10) {
        return "S";
    } else if(score >= 8) {
        return "A";
    } else if(score >= 5) {
        return "B";
    } else if(score >= 3) {
        return "C";
    } else if(score >= 1) {
        return "D";
    } else if(score === 0){
        return "E";
    }
}