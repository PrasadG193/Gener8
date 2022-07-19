import os
import openai
import json
from pathlib import Path
from flask import Flask, jsonify, request

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
model = Path('model/data.yaml').read_text()

@app.route("/v1/generate", methods=["POST"])
def handleGenerate():
  req_prompt = request.data.decode("utf-8") 
  #print(req_prompt)
  prompt = model + "## " + req_prompt + "\n" 
  # https://beta.openai.com/docs/api-reference/completions/create
  response = openai.Completion.create(
    model="text-davinci-002",
    prompt=prompt,
    temperature=0.5,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    stop=["---"]
  )
  #print("response", response)
  jsonToPython = json.loads(str(response))
  #print("jsonToPython", jsonToPython)
  result = jsonToPython['choices'][0]['text']
  #print("result", result)

  return jsonify(isError=False,
          message="Success",
          statusCode=200,
          data=result), 200

if __name__ == "__main__":
  app.run()
