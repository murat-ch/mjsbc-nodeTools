const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
    if (true) {
        console.log(err);
    }
    console.log(files);
});