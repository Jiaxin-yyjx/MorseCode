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

# Functions


# API Route
@app.route('/')
def homepage():
    return render_template('home.html')
@app.route('/intro')
def intro():
    return render_template('introduction.html')
@app.route('/menuchar')
def menuchar():
    letters_row1 = [chr(i) for i in range(65, 75)]  # A-J
    letters_row2 = [chr(i) for i in range(75, 84)]  # K-S
    letters_row3 = [chr(i) for i in range(84, 91)]  # T-Z
    return render_template('menuchar.html', letters_row1=letters_row1, letters_row2=letters_row2, letters_row3=letters_row3, words=words)

@app.route('/wordlearning/<int:index>')
def word_learning(index):
    return render_template('wordlearning.html', index=index, words=words, word=words[index])
@app.route('/finishedlearning')
def finished_learning():
    return render_template('finishedlearning.html')
@app.route('/start')
def start():
    return render_template('start.html')

if __name__ == "__main__":
    app.run(debug=True)