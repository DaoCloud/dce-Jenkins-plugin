#! /bin/bash -e

nginx -g "daemon on;"
exec "$@"