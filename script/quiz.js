const $button = document.querySelectorAll("#button");

const $retryButton = document.getElementById("retryButton");        //Retry処理
$retryButton.addEventListener("click", () => retryButtonHandler());

const $backbutton = document.getElementById("backButton");          //Back処理
$backbutton.addEventListener("click", () => backButtonHandler());


const buttonLength = $button.length;
for(let i = 0; i < buttonLength; i++) {
    $button[i].addEventListener("click", (e) => { answerJudge(e) });
}

const $question = document.getElementById("question");
const questionMax = 10;
let questions = null;
let questionsArray = Sort("QUESTIONS");
let questionsIndex = 0;
let score = 0;


setup();
displayRankAndScore();
getQuestions();

async function getQuestions() {
    try {
        const res = await fetch("../questionArray.json");

        if(!res.ok) {
            throw new Error("Failure get json.");
        }

        const jsonData = await res.json();
        questions = jsonData.questions;

        questionSetting(questionsIndex);
    } catch (error) {
        console.error(error);
    }
}
    
function setup() {
    const colorIdentifier = sessionStorage.getItem("colorTheme");
    const $body = document.getElementById("body");
    const $navigationBar = document.getElementById("navigationBar");
    
    if(colorIdentifier === "B") {
        $body.setAttribute("style", "background-color: #add8e6;");
        $navigationBar.setAttribute("style", "background-color: #000080;");
        buttonColorChange("btn-primary");
    } else if (colorIdentifier === "R") {
        $body.setAttribute("style", "background-color: #d8bfd8;");
        $navigationBar.setAttribute("style", "background-color: #dc143c;");
        buttonColorChange("btn-danger");
    } else if (colorIdentifier === "Y") {
        $body.setAttribute("style", "background-color: #eee8aa;");
        $navigationBar.setAttribute("style", "background-color: #d2691e;");
        buttonColorChange("btn-warning");
    } else {
        $body.setAttribute("style", "background-color: aquamarine;");
        $navigationBar.setAttribute("style", "background-color: #008080;");
        buttonColorChange("btn-success");
    }
}

function buttonColorChange(buttonColor) {
    $button.forEach(function(value, index, array) {
        array[index].classList.forEach(function(value, index, array) {
            if(value.startsWith("btn-")){
                array.replace(value, buttonColor);
            }
        })
    })
}

function displayRankAndScore() {
    const rankDisplayFlag = sessionStorage.getItem("rankDisplayFlag");
    const scoreDisplayFlag = sessionStorage.getItem("scoreDisplayFlag");

    const areaControl = [
        {
            $area: document.getElementById("rankArea"),
            displayFlag: rankDisplayFlag
        }, 
        {
            $area: document.getElementById("scoreArea"),
            displayFlag: scoreDisplayFlag
        }
    ]

    for(let i = 0; i < areaControl.length; i++) {
        if(areaControl[i].displayFlag == "true") {
            areaControl[i].$area.setAttribute("style", "display: block");
        } else {
            areaControl[i].$area.setAttribute("style", "display: none");
        }
    }

    rankAndScoreSetting(score);
}

function rankAndScoreSetting(score) {
    const $rank = document.getElementById("rankText");
    const $score = document.getElementById("scoreText");
    
    if(score === 10) {
        $rank.textContent = "RANK:  S";
    } else if(score >= 8) {
        $rank.textContent = "RANK:  A";
    } else if(score >= 5) {
        $rank.textContent = "RANK:  B";
    } else if(score >= 3) {
        $rank.textContent = "RANK:  C";
    } else if(score >= 1) {
        $rank.textContent = "RANK:  D";
    } else if(score === 0){
        $rank.textContent = "RANK:  E";
    }
    $score.textContent = "SCORE:  " + score;
}

function answerJudge(e) {
    if(e.target.textContent === questions[questionsArray[questionsIndex]].correct) {
        window.alert("正解");
        score++;
    } else {
        window.alert("不正解");
    }
    
    questionsIndex++;
    rankAndScoreSetting(score);
    canQuestionSetting(questionsIndex);
}

//問題のセッティング
function questionSetting() {
    $question.textContent = "問" + (questionsIndex + 1) + ": " + questions[questionsArray[questionsIndex]].question;

    let answerArray = Sort("ANSWER");
    let buttonIndex = 0;
    while(buttonIndex < buttonLength) {
        $button[answerArray[buttonIndex]].textContent = questions[questionsArray[questionsIndex]].answer[buttonIndex];
        buttonIndex++;
    }
}

//セッティングできるか判定
function canQuestionSetting(questionsIndex) {
    if(questionsIndex < questionMax) {
        questionSetting(questionsIndex);
    } else {
        if(!window.alert("終了")) {
            sessionStorage.setItem("score", score);
            window.location.href = "result.html";
        }
    }
}

function retryButtonHandler() {
    if(window.confirm("リトライしますか？\n(途中まで回答した内容は失われます)") === true) {
        window.location.reload();
    }
}

function backButtonHandler() {
    if(window.confirm("タイトル画面に戻りますか？\n(途中まで回答した内容は失われます)") === true) {
        //history.back();
        window.location.href = "../view/title.html";        
    }
}

//ランダムで並び順を生成して返却する関数(20問対応)
function Sort(type) {
    let array = [];
    let arrayLength = 0;
    let resultArray = [];

    if(type === "QUESTIONS") {
        array = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19
        ];
    } else {   //type = ANSWER
        array = [0, 1, 2, 3];
    }

    arrayLength = array.length;

    for(let i = 0; i < arrayLength; i++) {
        let index = Math.floor(Math.random() * (arrayLength - i));
        resultArray.push(array[index]);
        array.splice(index, 1);

        if(i + 1 === questionMax) {break};
    }

    return resultArray;
}
