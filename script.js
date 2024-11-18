const quizData = [
    {
        type: "multiple", // 4지선다형 퀴즈
        question: "벌레에게 물렸을 때 가려움이나 통증을 느끼게 되는 원인은?",
        options: ["아세트산", "폼산", "빙초산", "탄산"],
        correct: 1
    },
    {
        type: "multiple",
        question: "빵을 만드는 베이킹 소다의 주성분은?",
        options: ["수산화 나트륨", "수산화 마그네슘", "탄산수소 나트륨", "수산화 칼륨"],
        correct: 2
    },
    {
        type: "multiple",
        question: "염기의 맛은?",
        options: ["신맛", "단맛", "짠맛", "쓴맛"],
        correct: 3
    },
    {
        type: "multiple",
        question: "산이 전류가 흐르는 상태는?",
        options: ["기체", "고체", "수용액", "없다"],
        correct: 2
    },
    {
        type: "multiple",
        question: "산과 리트머스 종이의 반응 색은?",
        options: ["푸른색", "노란색", "무색", "붉은색"],
        correct: 3
    },
    {
        type: "multiple",
        question: "염기와 페놀프탈레인 용액의 반응 색은?",
        options: ["초록색", "푸른색", "무색", "붉은색"],
        correct: 3
    },
    {
        type: "multiple",
        question: "산과 BTB 용액의 반응 색은?",
        options: ["푸른색", "노란색", "무색", "붉은색"],
        correct: 1
    },
    {
        type: "multiple",
        question: "염기와 리트머스 종이의 반응 색은?",
        options: ["초록색", "푸른색", "무색", "붉은색"],
        correct: 1
    },
    {
        type: "multiple",
        question: "산과 페놀프탈레인 용액의 반응 색은?",
        options: ["푸른색", "노란색", "무색", "붉은색"],
        correct: 2
    },
    {
        type: "multiple",
        question: "염기와 BTB 용액의 반응 색은?",
        options: ["초록색", "푸른색", "무색", "붉은색"],
        correct: 1
    },
    {
        type: "multiple",
        question: "산과 메틸 오렌지 용액의 반응 색은?",
        options: ["푸른색", "노란색", "무색", "붉은색"],
        correct: 3
    },
    {
        type: "multiple",
        question: "염기와 메틸 오렌지 용액의 반응색은?",
        options: ["초록색", "노란색", "무색", "붉은색"],
        correct: 1
    }, 
    {
        type: "ox", // OX 퀴즈
        question: "농업에서 pH 농도 6.0 미만을 산성 토양으로 분류한다.",
        correct: "O" // 정답은 O
    },
    {
        type: "ox", // OX 퀴즈
        question: "pH 미터는 기준 전극과 지시 전극으로 이루어져 있다.",
        correct: "O" // 정답은 O
    },
    {
        type: "ox", // OX 퀴즈
        question: "정수 시설의 수돗물의 pH 농도는 pH 7이다.",
        correct: "O" // 정답은 O
    },
    {
        type: "ox", // OX 퀴즈
        question: "산은 물에 녹아 수소 이온(H+)을 내놓는다.",
        correct: "O" // 정답은 O
    },
    {
        type: "ox",
        question: "염기는 물에 녹아 염소 이온(Cl-)을 내놓는다.",
        correct: "X" // 정답은 X
    },
    {
        type: "ox",
        question: "산성 물질의 종류는 지시약의 색 변화와 관련이 있다.",
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
    // 입력값 가져오고 공백 제거
    const studentInfo = studentInfoInput.value.trim().replace(/\s+/g, '');

    // 학번(앞 5자리)과 이름(그 뒤 한글) 검증
    const inputRegex = /^(\d{5})([가-힣]+)$/; // 학번은 5자리 숫자, 이름은 한글

    const match = studentInfo.match(inputRegex);

    if (match) {
        // 학번과 이름 추출
        studentId = match[1]; // 첫 번째 캡처 그룹: 학번
        studentName = match[2]; // 두 번째 캡처 그룹: 이름

        // 정상적인 경우 퀴즈 시작
        startScreen.style.display = "none"; // 시작 화면 숨김
        startTimer(totalTime); // 전체 타이머 60초 시작
        loadQuiz(); // 퀴즈 시작
    } else {
        alert("학번은 5자리 숫자, 이름은 한글로 입력해야 합니다 (예: 10101홍길동)");
    }
};


function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    document.getElementById('question').innerHTML = `<h2>${currentQuizData.question}</h2>`; // 질문 표시

    buttonsDiv.innerHTML = ""; // 버튼 초기화
    selectedButton = null; // 선택된 버튼 초기화
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
    // 이전 선택한 버튼 초기화
    if (selectedButton) {
        selectedButton.style.backgroundColor = ""; // 기본 색상으로 초기화
    }

    // 현재 선택한 버튼을 초록색으로 변경
    button.style.backgroundColor = "#45a049";
    selectedButton = button; // 현재 선택한 버튼 저장

    checkAnswer(selectedIndex); // 정답 확인
}

function selectOXAnswer(button, answer) {
    // 이전 선택한 버튼 초기화
    if (selectedButton) {
        selectedButton.style.backgroundColor = ""; // 기본 색상으로 초기화
    }

    // 현재 선택한 버튼을 초록색으로 변경
    button.style.backgroundColor = "#45a049";
    selectedButton = button; // 현재 선택한 버튼 저장

    checkOXAnswer(answer); // 정답 확인
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
    quiz.innerHTML = `<h2>${studentId} ${studentName}님</h2>` + 
                     `<h2>총 ${quizData.length}문제 중 ${score / 100}문제 정답!</h2>`;
    buttonsDiv.innerHTML = ""; // 모든 버튼을 숨김
    result.innerHTML = `<h3>최종 점수: ${score}점</h3>` + 
           `<p style="color: blue; font-weight: bold;">점수 스크린샷 후 설문조사에 참여해주세요!</p>`; // 메시지 추가
    result.style.display = "block"; // 결과 화면 보이기
}
