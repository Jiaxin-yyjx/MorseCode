from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Jiaxin Yang", "Quan Fang"]}

if __name__ == "__main__":
    app.run(debug=True)