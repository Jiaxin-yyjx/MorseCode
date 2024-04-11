from flask import Flask, Response, jsonify, render_template, request
import json
import random
from collections import UserString

app = Flask(__name__)

# Data


# API Route
@app.route('/')
def homePage():
    return render_template('home.html')

if __name__ == "__main__":
    app.run(debug=True)