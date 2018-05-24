#!/bin/bash

cat <<EOT > /etc/supervisord.conf

[supervisord]
nodaemon=true

[program:nginx]
command=nginx -g "daemon off;"
autorestart=true
startsecs=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0

[program:app]
command=python /usr/local/bin/app.py
autorestart=true
startsecs=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0


EOT

exec supervisord
