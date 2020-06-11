#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, redirect, render_template, request, jsonify, url_for
from blueprints.index_blueprint import index_blueprint
from jinja_globals import jinja_env_globals
from config import config 
import time
import jinja2
import os
import json
import logging
import time

# add blueprints here, after they are imported
app_blueprints = [
    index_blueprint
]

def create_flask_app():
    app = Flask(__name__)
    template_dir = os.path.join(os.path.dirname(__file__), 'templates')
    jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)
    app.secret_key = config["secret_key"]
    app.jinja_env = jinja_env
    app.debug = True
    return app

def register_blueprints(app):
    for blueprint in app_blueprints:
        app.register_blueprint(blueprint)

def setup_app():
    app = create_flask_app()
    register_blueprints(app)
    return app

app = setup_app()

# allows us to use data memebers defined in jinja globals to be used within our html templates
app.jinja_env.globals.update(**jinja_env_globals)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)












