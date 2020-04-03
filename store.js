//Questionaire Object
const STORE = {
  //initialization
  page: "start",
  currentQuestion: 0,
  lastQuestion: null,
  score: 0,
  //images
  imgRight: "resources/Congrats.jpg",
  imgRightAlt: "Picture of the Chrono Squad",
  imgWrong: "resources/Lavos.jpg",
  imgWrongAlt: "Lavos with his eye open",
  img5: "resources/Crono.jpg",
  img3: "resources/Gaspar.jfif",
  img2: "resources/Chrono_Trigger.jpg",
  //questions
  questions: [// Question 1
    {
      question: "What is Marle's real name?",
      image: "resources/marle.jpg",
      imageAlt: "Marle from Chrono Trigger",
      options: [
        "Aliza",
        "Lenee",
        "Schala",
        "Nadia"
      ],
      answer: 3,
    },
    //Question 2
    {
      question: "What era is Robo from?",
      image: "resources/Robo.png",
      imageAlt: "Robo from Chrono Trigger",
      options: [
        "65,000,000 B.C.",
        "600 A.D.",
        "2300 A.D.",
        "13,000 B.C."
      ],
      answer: 2
    },
    //Question 3
    {
      question: "Who is Ayla's enemy in the prehistoric era?",
      image: "resources/Ayla.png",
      imageAlt: "Ayla from Chrono Trigger",
      options: [
        "Queen Zeal",
        "Azala",
        "Lavos",
        "Magus"
      ],
      answer: 1
    },
    //Question 4
    {
      question: "What is the name of Queen Zeal's floating fortress?",
      image: "resources/BlackOmen.png",
      imageAlt: "Floating fortress from Chrono Trigger",
      options: [
        "Guardia Castle",
        "Black Omen",
        "Reptite Lair",
        "Fiendlord's Keep"
      ],
      answer: 1
    },
    //Question 5
    {
      question: "Who starts the apocalypse in Chrono Trigger?",
      image: "resources/Apocalypse.png",
      imageAlt: "Picture of Apocalypse in Chrono Trigger",
      options: [
        "Magus",
        "Lavos",
        "Queen Zeal",
        "Azala"
      ],
      answer: 1
    }
  ],
};

//create a function startQuiz that...
function startQuiz() {
  //creates a jQuery object that looks for the button "startButton".click event.
  //then...
  $("#startButton").click(e => {
    //sets the page to the question page,
    STORE.page = "question"
    //sets the score back to zero,
    STORE.score = 0;
    //sets the current question to zero,
    STORE.currentQuestion = 0;
    //and renders the question page.
    render();
  });
}

//create a function getFeedback that...
function getFeedback() {
  //creates a jQuery object listening for the button "questionForm".submit event.
  //then...
  $("#getFeedback").submit(e => {
    //prevents default behavior of submit button,
    e.preventDefault();
    //creates variable "answer" and sets it equal to a jQuery object
    //value for the checked radio button,
    const answer = $("input:checked").val();
    //sets variable inquiry equal to the value stored in currentQuestion in
    //the array.
    const questionNo = STORE.questions[STORE.currentQuestion];
    //if the answer is the correct answer then...
    if (answer == questionNo.answer) {
      //adds one to the players score,
      STORE.score++
      //and tells the player they got the question right.
      STORE.lastQuestion = true;
    } else {//else the player got the question wrong and sets the value to false.
      STORE.lastQuestion = false;
    }
    //changes the page value of STORE to the feedback page
    STORE.page = "feedback";
    //calls the render function to display the correct feedback page
    render();
    //resets the html radio selector.
    e.target.reset();
  })
}

//create a function nextQuestion that...
function nextQuestion() {
  //creates a jQuery object listening for the nextQuestion
  //click event that...
  $("#nextQuestion").click(e => {
    //asks if the currentQuestion value of STORE is less than the length 
    //property of the questions array within STORE. and if it is...
    if (STORE.currentQuestion < STORE.questions.length - 1) {
      //adds one to the currentQuestion value, iterating through the questions
      //contained in STORE,
      STORE.currentQuestion++;
      //if there are more questions left, sets the page to "question" in STORE.
      STORE.page = "question";
    } else {//if no more questions remain, it sets the page value of STORE to "endScore".
      STORE.page = "endScore";
    }
    //then renders the correct page.
    render();
  });
}

//create a function showScore that...
function showScore() {
  //creates a jQuery object listening for the playAgain click event
  //that...
  $("#playAgain").click(e => {
    //sets the page value of STORE to start,
    STORE.page = "start"
    //and renders the start page.
    render();
  });
}


function render() {
  //if the page value of STORE is equal to "question"...
  if (STORE.page == "question") {
    //declare constants
    const trivia = STORE.questions[STORE.currentQuestion];
    const picture = STORE.questions[STORE.currentQuestion].image;
    const altAttr = STORE.questions[STORE.currentQuestion].imageAlt;

    //creates jQuery objects that take the value of the HTML element specified
    //and sets it to the value contained in STORE.
    $("#questionTitle").html(`#${STORE.currentQuestion + 1}: ${trivia.question}`);
    $("#questionImg").attr('src', picture);
    $("#questionImg").attr('alt', altAttr);
    $("#label0").html(trivia.options[0]);
    $("#label1").html(trivia.options[1]);
    $("#label2").html(trivia.options[2]);
    $("#label3").html(trivia.options[3]);
  } else if (STORE.page == "feedback") {//else if the page value of STORE is equal to "feedback"
    //const "correct" set equal to the answer of each question
    const correct = STORE.questions[STORE.currentQuestion].answer;
    //nested if the lastQuestion value of STORE is true...
    if (STORE.lastQuestion == true) {
      //create a jQuery object that changes the HTML of "feedbackMessage" to 
      //a congratulatory message
      $("#feedbackMessage").html(`Congratulations! you got it right! Score:${STORE.score}`);
      $("#feedbackImg").attr('src', STORE.imgRight);
      $("#feedbackImg").attr('alt', STORE.imgRightAlt);

    } else {//nested else change the HTML of "feedbackMessage" to "Not Quite."
      $("#feedbackMessage").html("Not Quite! Try again!");
      $("#feedbackImg").attr('src', STORE.imgWrong);
      $("#feedbackImg").attr('alt', STORE.imgWrongAttr);
    }
  } else if (STORE.page == "endScore") {//else if page value of STORE is "endScore"
    //change the HTML to reflect the final score.
    $("#finalScore").html(`Final Score: ${STORE.score} out of ${STORE.questions.length}`);
    //if you get a perfect score then...
    if (STORE.score === 5) {
      $("#finalScoreImg").attr('src', STORE.img5);
      $("#scoreText").html("You are the master of time, Just like Crono!");
    }
    //else if score is less than or equal to 3, then...
    else if (STORE.score >= 3) {
      $("#finalScoreImg").attr('src', STORE.img3);
      $("#scoreText").html("You should speak to the Guru of Time, Gaspar. He can guide you further. But remember, don't Touch the gate coming out of the bucket!");
    }
    //else if the score is less than 2, then...
    else if (STORE.score <= 2) {
      $("#finalScoreImg").attr('src', STORE.img2);
      $("#scoreText").html("Have you even heard of Chrono Trigger?");
    } else {//do nothing

    }

  } else {//else do nothing

  }

  //jquery object that looks for all sections in the main of the
  //html, and hides them.
  $("main section").hide();
  //jquery object, showing only the section specified by page val
  //of STORE.
  $("#" + STORE.page).show();
}

//calls all functions at first page load
function main() {
  showScore();
  nextQuestion();
  getFeedback();
  startQuiz();
  render();
}
//jQuery object that calls main function for initial load of page.
$(main);