import time
from config import config
from flask import url_for, get_flashed_messages

def now():
    return time.time()

jinja_env_globals = {
    "now": now,
    "config": config,
    "url_for": url_for,
}
