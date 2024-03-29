# Gener8
Generate Kubernetes resource YAML manifests from a text prompt

Gener8 is a simple Kubernetes resource YAML generator based on OpenAI's GPT-3 model.

## Usage

Gener8 is available at https://gener8.prasadg.dev

Alternatively, you can also build and run it locally

### Build from source

1. Clone the repo
   ```
   git clone https://github.com/PrasadG193/Gener8.git /required/path
   ```

2. Create python virtual env using
   ```
   $ python3 -m venv venv
   $ source venv/bin/activate
   ```

3. Run the server
   ```
    $ python3 app.py 
    * Serving Flask app 'app' (lazy loading)
    * Environment: production
    WARNING: This is a development server. Do not use it in a production deployment.
    Use a production WSGI server instead.
    * Debug mode: off
    * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)

   ```
   
4. Example usage.
   ```
   $ curl -i -X POST -H "Content-Type: text/plain" localhost:5000/v1/generate -d "deployment with nginx:1.14.2 image and 10 replicas"
    HTTP/1.1 200 OK
    Server: Werkzeug/2.1.2 Python/3.8.10
    Date: Mon, 25 Jul 2022 04:08:58 GMT
    Content-Type: text/html; charset=utf-8
    Content-Length: 383
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Content-Type
    Connection: close

    # Auto-generated by Gener8 - https://github.com/PrasadG193/Gener8
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx-deployment
    spec:
      selector:
        matchLabels:
          app: nginx
      replicas: 10
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:1.14.2
            ports:
            - containerPort: 80
   ```

## Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:
- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
