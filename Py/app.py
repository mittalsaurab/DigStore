from flask import Flask, request
from werkzeug.utils import secure_filename
import os
from pathlib import Path
app = Flask(__name__)
UPLOAD_FOLDER = './database'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload/<user_id>/<image_id>', methods=['POST'])
def upload(user_id, image_id):
    file = request.files['file']
    filename = secure_filename(file.filename)
    temp_path = os.path.join(app.config['UPLOAD_FOLDER'], user_id)
    if not os.path.exists(temp_path):
        os.makedir(temp_path)
    file.save(temp_path, image_id+Path(filename).suffix)

if __name__ == '__main__':
    app.run(debug=True)