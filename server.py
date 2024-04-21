from flask import Flask, Response, jsonify, render_template, request
import json
import random
from collections import UserString

app = Flask(__name__)

# Data
words = {
    0: "SOS",
    1: "HELLO",
    2: "THANKS",
    3: "LOVE",
    4: "QRV"
}

QUIZ_QUESTION_TYPE =["MULTIPLE_CHOICE", "SPELLING", "SOUND_CHOICE", "VISUAL_CHOICE"]
morse_code_dict_Char = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.', 
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---', 
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---', 
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-', 
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--', 
    'Z': '--..'
}

morse_code_dict = {
    'SOS': '...---...',
    'HELLO': '......-...-..---',
    'THANKS': '-.....- -.-.-...',
    'LOVE': '.-..---...-.',
    'QRV': '--.-.-....-',
    'S': '...',
    'V': '...-',
    'R': '.-.',
    'N': '-.',
    'Q': '--.-',
    'H': '....',
    'K': '-.-',
    'L': '.-..',
    'E': '.',
    'A': '.-',
    'O': '---',
    'T': '-'
}

# Functions
question_template = {
    'question_index':0,
    'question':"",
    'correct_answer': '',
    'choices':[],
    'user_answer':''
}
quiz_dashboard = []
quiz_score = 0

# API Route
@app.route('/')
def homepage():
    return render_template('home.html')

@app.route('/intro')
def intro():
    return render_template('introduction.html')

# Learn related API
@app.route('/menuchar')
def menuchar():
    letters_row1 = [chr(i) for i in range(65, 75)]  # A-J
    letters_row2 = [chr(i) for i in range(75, 84)]  # K-S
    letters_row3 = [chr(i) for i in range(84, 91)]  # T-Z
    return render_template('Learn/menuchar.html', letters_row1=letters_row1, letters_row2=letters_row2, letters_row3=letters_row3, words=words)

@app.route('/wordlearning/<int:index>')
def word_learning(index):
    return render_template('Learn/wordlearning.html', index=index, words=words, word=words[index])

@app.route('/finishedlearning')
def finished_learning():
    return render_template('Learn/finishedlearning.html')

@app.route('/start')
def start():
    return render_template('Learn/start.html')

@app.route('/dashtree')
def dashtree():
    return render_template('learn/dashtree.html')

# Quiz related API
@app.route('/quiz_landing', methods=['GET'])
def quiz_landing():
    global quiz_dashboard, quiz_score
    # Clean the results before taking the quiz
    quiz_dashboard = []
    quiz_score = 0
    return render_template('Quiz/landing.html')

@app.route('/quiz_result', methods=['GET'])
def quiz_result():
    global quiz_dashboard, quiz_score
    return render_template('Quiz/result.html', quiz_dashboard=quiz_dashboard, quiz_score=quiz_score)

@app.route('/get_a_new_question', methods=['GET'])
def get_a_new_question():
    global quiz_dashboard
    # If the 10 question as complete
    if len(quiz_dashboard) == 10:
        return jsonify(number_of_question = len(quiz_dashboard))
    # Randomly generate next question
    random_question_type = random.choice(QUIZ_QUESTION_TYPE)
    print(f'Pick question type {random_question_type}')
    if random_question_type == "MULTIPLE_CHOICE":
        return get_one_multiple_choice_question()
    if random_question_type == "SPELLING":
        return get_one_spelling_question()
    if random_question_type == "SOUND_CHOICE":
        return get_one_choose_sound_multiple_choice_question()
    if random_question_type == "VISUAL_CHOICE":
        return get_one_choose_visual_multiple_choice_question()
    
# TODO: Not support yet
@app.route('/get_previou_question', methods=['GET'])
def get_previou_question():
    return 0 

@app.route('/review_question/<int:question_index>', methods=['GET'])
def get_question_index(question_index):
    global quiz_dashboard, quiz_score
    print(quiz_dashboard)
    quiz_question = quiz_dashboard[question_index]
    quiz_question['mode'] = "REVIEW"

    if quiz_question['type'] == "MULTIPLE_CHOICE":
        return render_template('Quiz/multiple_choice.html', quiz_question = quiz_question)
    if quiz_question['type'] == "SPELLING":
        return render_template('Quiz/spelling.html', quiz_question = quiz_question)
    if quiz_question['type'] == "SOUND_CHOICE":
        return render_template('Quiz/choose_sound_multiple_choice.html', quiz_question = quiz_question)
    if quiz_question['type'] == "VISUAL_CHOICE":
        return render_template('Quiz/choose_visual_multiple_choice.html', quiz_question = quiz_question)
    
@app.route('/quiz_one_multiple_choice_question', methods=['GET'])
def get_one_multiple_choice_question():
    global quiz_dashboard
    quiz_question = {}
    question, correct_answer = random.choice(list(morse_code_dict.items()))
    
    choices = [(question, correct_answer)]
    while len(choices) != 4:
        temp_question, temp_answer =random.choice(list(morse_code_dict.items()))
        if not (temp_question, temp_answer) in choices:
            choices.append((temp_question, temp_answer))
    random.shuffle(choices)
    question_index = len(quiz_dashboard)

    quiz_question['question_index'] = question_index
    quiz_question['question'] = question
    quiz_question['correct_answer'] = correct_answer
    quiz_question['choices'] = choices
    quiz_question['type'] = "MULTIPLE_CHOICE"
    quiz_question['mode'] = "QUIZ"
    quiz_dashboard.append(quiz_question)
    
    # return render_template('Quiz/multiple_choice.html', quiz_question = quiz_question, question = question, choices = choices, question_index=question_index, mode = "QUIZ")
    return render_template('Quiz/multiple_choice.html', quiz_question = quiz_question)

@app.route('/quiz_one_spelling_question', methods=['GET'])
def get_one_spelling_question():
    global quiz_dashboard
    quiz_question = {}
    question, correct_answer = random.choice(list(morse_code_dict.items()))
    question_index = len(quiz_dashboard)

    quiz_question['question_index'] = question_index
    quiz_question['question'] = question
    quiz_question['correct_answer'] = correct_answer
    quiz_question['type'] = "SPELLING"
    quiz_question['mode'] = "QUIZ"
    quiz_dashboard.append(quiz_question)
    
    return render_template('Quiz/spelling.html', quiz_question = quiz_question)

@app.route('/quiz_one_choose_sound_multiple_choice_question', methods=['GET'])
def get_one_choose_sound_multiple_choice_question():
    global quiz_dashboard
    quiz_question = {}
    question, correct_answer = random.choice(list(morse_code_dict.items()))
    
    choices = [(question, correct_answer)]
    while len(choices) != 4:
        temp_question, temp_answer =random.choice(list(morse_code_dict.items()))
        if not (temp_question, temp_answer) in choices:
            choices.append((temp_question, temp_answer))
    random.shuffle(choices)
    question_index = len(quiz_dashboard)

    quiz_question['question_index'] = question_index
    quiz_question['question'] = question
    quiz_question['correct_answer'] = correct_answer
    quiz_question['choices'] = choices
    quiz_question['type'] = "SOUND_CHOICE"
    quiz_question['mode'] = "QUIZ"
    quiz_dashboard.append(quiz_question)
    
    return render_template('Quiz/choose_sound_multiple_choice.html', quiz_question = quiz_question)


@app.route('/quiz_one_choose_visual_multiple_choice_question', methods=['GET'])
def get_one_choose_visual_multiple_choice_question():
    global quiz_dashboard
    quiz_question = {}
    question, correct_answer = random.choice(list(morse_code_dict.items()))
    
    choices = [(question, correct_answer)]
    while len(choices) != 4:
        temp_question, temp_answer =random.choice(list(morse_code_dict.items()))
        if not (temp_question, temp_answer) in choices:
            choices.append((temp_question, temp_answer))
    random.shuffle(choices)
    question_index = len(quiz_dashboard)

    quiz_question['question_index'] = question_index
    quiz_question['question'] = question
    quiz_question['correct_answer'] = question
    quiz_question['choices'] = choices
    quiz_question['type'] = "VISUAL_CHOICE"
    quiz_question['mode'] = "QUIZ"
    quiz_dashboard.append(quiz_question)
    
    # return render_template('Quiz/multiple_choice.html', quiz_question = quiz_question, question = question, choices = choices, question_index=question_index, mode = "QUIZ")
    return render_template('Quiz/choose_visual_multiple_choice.html', quiz_question = quiz_question)


def varify_multiple_choice_answer(question_index, answer_content):
    global quiz_score, quiz_dashboard
    quiz_question = quiz_dashboard[question_index]
    # Update user's answer
    if not 'user_answer' in quiz_question:
        quiz_question['user_answer'] = answer_content
        if answer_content == quiz_question['correct_answer']:
            quiz_question['correct'] = True
            quiz_score += 1
        else:
            quiz_question['correct'] = False
    print(quiz_dashboard)
    return quiz_score

@app.route('/submit_multiple_choice_answer', methods=['POST'])
def submit_multiple_choice_answer():

    json_data = request.get_json()
    quiz_score = varify_multiple_choice_answer(json_data['question_index'],json_data['answer_content'])

    return jsonify(number_of_question=len(quiz_dashboard))

@app.route('/submit_spelling_answer', methods=['POST'])
def submit_spelling_answer():

    json_data = request.get_json()
    quiz_score = varify_multiple_choice_answer(json_data['question_index'],json_data['answer_content'])

    return jsonify(number_of_question=len(quiz_dashboard))

@app.route('/submit_sound_multiple_choice_answer', methods=['POST'])
def submit_sound_multiple_choice_answer():

    json_data = request.get_json()
    quiz_score = varify_multiple_choice_answer(json_data['question_index'], json_data['answer_content'])

    return jsonify(number_of_question=len(quiz_dashboard))

if __name__ == "__main__":
    app.run(debug=True)