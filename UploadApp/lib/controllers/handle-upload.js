let multer = require('multer');
var fs = require('fs');
const DIR = './public/';
var path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


module.exports = (app, api) => {
  api.post('/uploadfile', upload.single('randImage'), (req, res, next) => {
    res.json({ yo: "its working" })
  })

  api.post('/uploaddirective', function (req, res) {
    res.json({ yo: "its working too" });
  });


  api.delete('/removeFile/:something', function (req, res) {
    console.log("--params->", req.params);
    var thisparam = req.params;
    var finalParam = parseInt(thisparam.something);
    console.log("--finalparams->", finalParam);
    //
    fs.readdir(DIR, (err, files) => {
      if (err) throw err;

      for (const [i, file] of files.entries()) {
        console.log(i, "------", file)
        if (i == finalParam) {
          fs.unlink(path.join(DIR, file), err => {
            if (err) throw err;
            res.json({ yo: "its deleted" });
          });
        }

      }
    });

  });

  api.get("/", (req, res, next) => {


    function readFiles(dirname, onError) {
      fs.readdir(dirname, function (err, filenames) {
        if (err) {
          onError(err);
          return;
        }
        var bar = new Promise((resolve, reject) => {
          var someArr = [];
          filenames.forEach(function (filename, index, filenames) {
            fs.readFile(dirname + filename, function (err, content) {
              if (err) {
                onError(err);
                return;
              }
              var base64data = Buffer.from(content).toString('base64');
              someArr.push(base64data);
              if (filenames.length - 1 === someArr.length - 1) resolve(someArr);
            });
          });
        });

        bar.then((chk) => {
          res.status(200).json({
            message: "files retrieved successfully!",
            images: chk
          });
        });

      });
    }


    readFiles(DIR);

  });


}