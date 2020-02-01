const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/files/'});

const app = express();
const PORT = 3000;

// app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    // console.log(upload);
    console.log(req.body.name);
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});



app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});