from flask import Flask, request
from main import gener8

app = Flask(__name__)

@app.route("/v1/generate", methods=["POST"])
def handleGenerate():
  return gener8(request)

if __name__ == "__main__":
  app.run()
