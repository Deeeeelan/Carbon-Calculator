from flask import Flask, render_template # requires flask for python to be used on a web page
from flask_cors import CORS
import dotenv

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def index():
    return "index"

@app.route("/map", methods=['GET'])
def map():
    return "test"

if __name__ == "__main__":
    app.run(debug=True, port=5001)