const $question = document.getElementById("question");
const $button = document.querySelectorAll("#button");
const buttonLength = $button.length;
const questionMax = 10;

let questionsArray = Sort("QUESTIONS");
let questionsIndex = 0;
let score = 0;
questionSetting(questionsIndex);

//ボタン押下時の判定
for(let i = 0; i < buttonLength; i++) {
    $button[i].addEventListener("click", (e) => {
        if(e.target.textContent === questions[questionsArray[questionsIndex]].correct) {
            window.alert("正解");
            score++;
        } else {
            window.alert("不正解");
        }
        
        questionsIndex++;
        canQuestionSetting(questionsIndex);
    })
}

//Retry処理
const $retryButton = document.getElementById("retryButton");
$retryButton.addEventListener("click", () => {
    if(window.confirm("リトライしますか？\n(途中まで回答した内容は失われます)") === true) {
        window.location.reload();
    }
})

//Back処理
const $backbutton = document.getElementById("backButton");
$backbutton.addEventListener("click", () => {
    if(window.confirm("タイトル画面に戻りますか？\n(途中まで回答した内容は失われます)") === true) {
        //history.back();
        window.location.href = "../view/title.html";        
    }
})

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

/*-------解説部分の表示(Test)--------*/
const $body = document.getElementById("body").addEventListener("keydown", (e) => {
    const $commentaryArea = document.querySelector("#commentaryArea");
    if(e.key === "Enter") {
        
        let areaAttr = $commentaryArea.getAttribute("style");

        if(areaAttr === "display: none") {
            $commentaryArea.setAttribute("style", "display: block");
        } else if(areaAttr != "display: none") {
            $commentaryArea.setAttribute("style", "display: none");
        }
    }
})


