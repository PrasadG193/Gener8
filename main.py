import os
import openai
import json
from pathlib import Path
from flask import jsonify, request

def gener8(request):
  openai.api_key = os.environ.get("OPENAI_API_KEY", "Specified env var not set")
  model = Path('model/data.yaml').read_text()

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

  response = jsonify(isError=False,
          message="Success",
          statusCode=200,
          data=result), 200
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response
