#! /usr/bin/env python
import json
from flask import request
from flask import Response
from flask import Flask
from dce_plugin import PluginSDK
from functools import wraps


app = Flask(__name__)


def json_response(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        response = view_func(*args, **kwargs)
        response_code = 200
        response_headers = dict()
        if isinstance(response, dict) or isinstance(response, list):
            response_body = json.dumps(response, indent=4)
        elif isinstance(response, tuple):
            if len(response) == 2:
                response_body, response_code = response
            else:
                response_body, response_code, response_headers = response

            response_body = json.dumps(response_body, indent=4)
        else:
            response_body = response

        return Response(response=response_body, status=response_code,
                        headers=response_headers, mimetype='application/json')

    return wrapper


def get_settings():
    sdk = PluginSDK()
    c = sdk.get_config() or {}
    return c


def update_settings():
    try:
        data = json.loads(request.data)
    except Exception as e:
        raise e

    sdk = PluginSDK()
    sdk.set_config(data)
    return data


@app.route("/plugin.config", methods=['GET'])
@json_response
def get_settings_api():
    return get_settings()


@app.route("/plugin.config", methods=['POST'])
@json_response
def update_settings_api():
    return update_settings()


if __name__ == "__main__":
    app.run()
