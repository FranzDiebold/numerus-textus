# Gunicorn configuration file

bind = '0.0.0.0:8000'

timeout = 70

loglevel = 'info'
errorlog = '-'
accesslog = '-'
