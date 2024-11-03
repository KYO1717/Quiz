const quizData = [
    {
        type: "multiple", // 4지선다형 퀴즈
        question: "대한민국의 수도는?",
        options: ["서울", "부산", "대전", "인천"],
        correct: 0
    },
    {
        type: "multiple",
        question: "지구는 태양을 몇 시간 만에 한 바퀴 돕니까?",
        options: ["12시간", "24시간", "48시간", "72시간"],
        correct: 1
    },
    {
        type: "multiple",
        question: "컴퓨터에서 사용되는 0과 1로만 이루어진 코드를 무엇이라 합니까?",
        options: ["이진법", "십진법", "육진법", "이십진법"],
        correct: 0
    },
    {
        type: "ox", // OX 퀴즈
        question: "대한민국은 아시아에 위치해 있다.",
        correct: "O" // 정답은 O
    },
    {
        type: "ox",
        question: "미국의 수도는 뉴욕이다.",
        correct: "X" // 정답은 X
    }
];

const quiz = document.getElementById("quiz");
const buttonsDiv = document.getElementById("buttons");
const result = document.getElementById("result");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const studentInfoInput = document.getElementById("student-info");
const timer = document.getElementById("timer"); // 타이머 표시를 위한 추가

let currentQuiz = 0;
let score = 0;
let countdown; // 타이머 변수
let totalTime = 60; // 전체 타이머를 60초로 설정
let selectedButton = null; // 선택한 버튼을 추적하는 변수
let studentId; // 학번 변수
let studentName; // 이름 변수

startButton.onclick = () => {
    const studentInfo = studentInfoInput.value.replace(/\s+/g, '').trim(); // 공백 제거
    studentId = studentInfo.slice(0, 5); // 학번 (앞 5자리)
    studentName = studentInfo.slice(5).trim(); // 이름 (5자리 이후)

    // 학번은 5자리 숫자인지 체크
    const idValid = /^\d{5}$/.test(studentId);
    
    if (idValid) {
        startScreen.style.display = "none"; // 시작 화면 숨김
        startTimer(totalTime); // 전체 타이머 60초 시작
        loadQuiz(); // 퀴즈 시작
    } else {
        alert("학번은 5자리 숫자로 입력해야 합니다! (예: 10101홍길동)");
    }
};

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    document.getElementById('question').innerHTML = `<h2>${currentQuizData.question}</h2>`; // 질문 표시

    buttonsDiv.innerHTML = ""; // 버튼 초기화
    buttonsDiv.style.display = "grid"; // 버튼 보이기

    if (currentQuizData.type === "multiple") {
        // 4지선다형 문제일 때
        currentQuizData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.style.padding = "10px 20px"; // 버튼 크기 조정
            button.onclick = () => {
                selectAnswer(button, index); // 선택한 버튼을 전달
            };
            buttonsDiv.appendChild(button);
        });
    } else if (currentQuizData.type === "ox") {
        // OX 문제일 때
        const buttonO = document.createElement("button");
        buttonO.textContent = "O";
        buttonO.style.padding = "10px 20px";
        buttonO.onclick = () => {
            selectOXAnswer(buttonO, "O");
        };
        buttonsDiv.appendChild(buttonO);

        const buttonX = document.createElement("button");
        buttonX.textContent = "X";
        buttonX.style.padding = "10px 20px";
        buttonX.onclick = () => {
            selectOXAnswer(buttonX, "X");
        };
        buttonsDiv.appendChild(buttonX);
    }

    quiz.style.display = "block"; // 퀴즈 보이기
    buttonsDiv.style.display = "block";
}

function startTimer(duration) {
    let timeLeft = duration;
    timer.style.display = "block"; // 타이머 보이기
    timer.textContent = `남은 시간: ${timeLeft}초`; // 타이머 표시

    countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = `남은 시간: ${timeLeft}초`; // 남은 시간 업데이트

        if (timeLeft <= 0) {
            clearInterval(countdown); // 타이머 종료
            showResults(); // 시간이 다 되면 결과 표시
        }
    }, 1000); // 1초마다 감소
}

function selectAnswer(button, selectedIndex) {
    // 이전에 선택한 버튼이 있으면 원래 색깔로 되돌리기
    if (selectedButton) {
        selectedButton.style.backgroundColor = "";
    }

    // 클릭한 버튼을 초록색으로 변경
    button.style.backgroundColor = "#45a049";
    selectedButton = button; // 현재 선택된 버튼 저장

    checkAnswer(selectedIndex);
}

function selectOXAnswer(button, answer) {
    // 이전에 선택한 버튼이 있으면 원래 색깔로 되돌리기
    if (selectedButton) {
        selectedButton.style.backgroundColor = "";
    }

    // 클릭한 버튼을 초록색으로 변경
    button.style.backgroundColor = "#45a049";
    selectedButton = button; // 현재 선택된 버튼 저장

    checkOXAnswer(answer);
}

function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuiz].correct;

    if (selectedIndex === correctIndex) {
        score += 100; // 정답을 맞췄을 때 100점 추가
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz(); // 다음 문제 로드
    } else {
        showResults(); // 모든 문제를 풀면 결과 표시
    }
}

function checkOXAnswer(selectedAnswer) {
    const correctAnswer = quizData[currentQuiz].correct;

    if (selectedAnswer === correctAnswer) {
        score += 100; // 정답을 맞췄을 때 100점 추가
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz(); // 다음 문제 로드
    } else {
        showResults(); // 모든 문제를 풀면 결과 표시
    }
}

function showResults() {
    clearInterval(countdown); // 타이머 중지
    quiz.innerHTML = `<h2>${studentId} ${studentName}님!</h2>` + 
                     `<h2>총 ${quizData.length}문제 중 ${score / 100}문제를 맞췄습니다!</h2>`;
    buttonsDiv.innerHTML = ""; // 모든 버튼을 숨김
    result.innerHTML = `<h3>최종 점수: ${score}점</h3>`; // 최종 점수 표시
    result.style.display = "block"; // 결과 화면 보이기
}