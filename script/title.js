(() => {
    const $start = document.getElementById("startButton");
    $start.addEventListener("click", () => startQuiz());

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

//-----------------

    const $checkTest = document.getElementById("flexSwitchCheckDefault");
    

    const $colorThemeConfig = document.getElementById("colorThemeConfig");
    console.log($colorThemeConfig);

    $colorThemeConfig.addEventListener("change", () => {
        console.log("123");
    })

    


    //okボタンを押すと設定を反映する
    //まずは、selectで選ばれているものを取得する方法から探る



}) ();
