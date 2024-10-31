// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas sobre Node.js
const questions = [
  {
    "question": "O que é Node.js?",
    "answers": [
      {
        "answer": "Um sistema operacional",
        "correct": false
      },
      {
        "answer": "Uma biblioteca do JavaScript",
        "correct": false
      },
      {
        "answer": "Um ambiente de execução JavaScript",
        "correct": true
      },
      {
        "answer": "Uma linguagem de programação",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual é a principal vantagem do Node.js?",
    "answers": [
      {
        "answer": "Desempenho em aplicações de rede",
        "correct": true
      },
      {
        "answer": "Facilidade de uso",
        "correct": false
      },
      {
        "answer": "Interface gráfica",
        "correct": false
      },
      {
        "answer": "Armazenamento de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Node.js é baseado em qual motor JavaScript?",
    "answers": [
      {
        "answer": "V8",
        "correct": true
      },
      {
        "answer": "SpiderMonkey",
        "correct": false
      },
      {
        "answer": "JavaScriptCore",
        "correct": false
      },
      {
        "answer": "Chakra",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual dos seguintes é um framework popular para Node.js?",
    "answers": [
      {
        "answer": "Django",
        "correct": false
      },
      {
        "answer": "Flask",
        "correct": false
      },
      {
        "answer": "Express",
        "correct": true
      },
      {
        "answer": "Ruby on Rails",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual comando é usado para instalar pacotes no Node.js?",
    "answers": [
      {
        "answer": "npm install",
        "correct": true
      },
      {
        "answer": "node install",
        "correct": false
      },
      {
        "answer": "npm get",
        "correct": false
      },
      {
        "answer": "node get",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual é a extensão padrão para arquivos de módulos do Node.js?",
    "answers": [
      {
        "answer": ".node",
        "correct": false
      },
      {
        "answer": ".js",
        "correct": true
      },
      {
        "answer": ".mjs",
        "correct": false
      },
      {
        "answer": ".json",
        "correct": false
      },
    ]
  },
  {
    "question": "O que é o NPM?",
    "answers": [
      {
        "answer": "Um banco de dados",
        "correct": false
      },
      {
        "answer": "Um gerenciador de pacotes",
        "correct": true
      },
      {
        "answer": "Um servidor",
        "correct": false
      },
      {
        "answer": "Uma linguagem de programação",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual método é usado para ler um arquivo de forma assíncrona em Node.js?",
    "answers": [
      {
        "answer": "fs.readFileSync()",
        "correct": false
      },
      {
        "answer": "fs.readFile()",
        "correct": true
      },
      {
        "answer": "fs.read()",
        "correct": false
      },
      {
        "answer": "fs.open()",
        "correct": false
      },
    ]
  },
  {
    "question": "O que é um Callback no Node.js?",
    "answers": [
      {
        "answer": "Uma função que é chamada após outra função ser executada",
        "correct": true
      },
      {
        "answer": "Uma biblioteca",
        "correct": false
      },
      {
        "answer": "Um comando do sistema",
        "correct": false
      },
      {
        "answer": "Um objeto",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual é o comando para iniciar um projeto Node.js?",
    "answers": [
      {
        "answer": "npm start",
        "correct": false
      },
      {
        "answer": "node init",
        "correct": false
      },
      {
        "answer": "npm init",
        "correct": true
      },
      {
        "answer": "node start",
        "correct": false
      },
    ]
  }
];

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0);
}

// Create a question 
function createQuestion(i) {
  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function(answer, i) {
    // Altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);
  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;
}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  // Exibir respostas erradas e a certa
  buttons.forEach(function(button) {
    if (button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      // checa se o usuário acertou
      if (btn === button) {
        // incrementa os pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  // Chamar a próxima pergunta após um atraso
  nextQuestion();
}

// Exibe a próxima pergunta
function nextQuestion() {
  // Timer para ver se acertou ou errou
  setTimeout(function() {
    // checa se ainda há mais perguntas
    if (actualQuestion >= questions.length) {
      // apresenta msg de sucesso
      showSuccessMessage();
      return;
    }
    createQuestion(actualQuestion);
  }, 1500); // Aumentado para 1500ms
}

// Tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // calc score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // alterar número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Mostra ou exibe o quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Inicialização
init();