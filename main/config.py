import os
from google.appengine.api import app_identity

config = {
    "is_development": os.environ.get("SERVER_SOFTWARE").startswith("Development"),
    "app_id": app_identity.get_application_id(),
    "brand_name": "Lynkspot",
    "secret_key": '247660f7a0f44bd48b0838698f38105c', #replace with new key: (uuid.uuid4().hex)
}