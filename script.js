// JS POO

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        // return un boolean
        return this.answer === choice;
    }
}

// tab qui regroupe le quiz
let questions = [
    // une instance question avec (text, choices,answer)
    new Question("De quel pays Lisbonne est-elle la capitale ?", ["Espagne", 'Portugal', 'Irlande', 'Suisse'], "Portugal"),
    new Question("De quel pays Séoul est-elle la capitale ? ", ["Vietnam", 'Thaïlande', 'Corée Du Sud', 'Malaisie'], "Corée Du Sud"),
    new Question("De quel pays Beyrouth est-elle la capitale ?", ["liban", 'Syrie', 'Laos', 'Yémen'], "liban"),
    new Question("De quel pays Varsovie est-elle la capitale ?", ["Autriche", 'Ukraine', 'Croatie', 'Pologne'], "Pologne"),
    new Question("De quel pays Lima est-elle la capitale ? ", ["Pérou", 'Colombie', 'Cuba', 'Chili'], "Pérou")
];

console.log("questions = " + questions);

class Quiz {
    constructor(questions) {
        // LE SCORE A AFFICHER A LA FIN DU QUIZ
        this.score = 0;
        this.questions = questions;
        // indexOf 1er elem du tab questions
        this.currentQuestionIndex = 0;
    }
    // FUNCT QUI RECUPERE LA QUESTION SELON L'INDEX
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        // si answer === choice on incremetn le score
        if(this.getCurrentQuestion().isCorrectAnswer(answer)){
            this.score++;
        }
        // ensuite on incremente pour passer a la question suivante
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// function en relation avc l'affichage de l'APP
const display = {
    // pour simplifier et ne pas appler chaque fois tous les elements qui ont un id
    // on va juste appeler la function elementShown
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },

    endQuiz: function() {
        endQuizHTML = `
            <h1>Quiz Terminé !</h1>
            <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
        // element avec id="question" on lui insere html === endQuizHtml
        this.elementShown("quiz", endQuizHTML);
    },
 
    question: function() {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },

    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;
        console.log("choices = " + choices);

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function() {
                quiz.guess(guess);
                quizApp();
            }
        }
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess"+i, choices[i]);  
        }
    },

    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown('progress', "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }
} 

//logique du quiz
quizApp = () => {
    if(quiz.hasEnded()) {
        // end
        display.endQuiz();
    } else {
        //logique
        // afficher question
        display.question();
        // afficher choices
        display.choices();
        // afficher le progress
        display.progress();
    }
}

// create quiz
let quiz = new Quiz(questions);

// lancement de l'application au demarrage !
quizApp();

console.log(quiz);