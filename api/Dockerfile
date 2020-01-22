FROM python:3.8.1-alpine3.11

# Required packages for psycopg2
RUN apk update \
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "-c", "gunicorn_conf.py", "--chdir", "number2text", "number2text.wsgi:application", "--reload"]
