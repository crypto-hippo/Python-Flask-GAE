from flask import Blueprint, jsonify, request, render_template, redirect, url_for
from config import config

index_blueprint = Blueprint('index_blueprint', __name__, template_folder='templates')

@index_blueprint.route("/")
def index():
    return render_template("index.html")