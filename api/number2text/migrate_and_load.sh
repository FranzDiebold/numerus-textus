#!/usr/bin/env bash

python manage.py collectstatic --no-input

python manage.py makemigrations
python manage.py migrate

python manage.py loaddata fixtures/admin_user.json

python manage.py loaddata app/fixtures/test_words.json
python manage.py loaddictionary igerman98_cust.txt de
python manage.py loaddictionary en_2of12inf.txt en