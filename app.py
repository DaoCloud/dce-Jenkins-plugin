from flask import Flask
app = Flask(__name__)

@app.route("/plugin.config")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
