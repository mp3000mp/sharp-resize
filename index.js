let sharp = require('sharp');
let fs = require('fs');
let path = require('path');


let resizeTo = 32; // px
let srcFolder = './input';
let destFolder = './output';
let i = 0;


// check folders exist
if(fs.existsSync(srcFolder)){
    if(fs.existsSync(destFolder)){

        // pour chaque fichier
        fs.readdir(srcFolder, function (err, files) {

            if(files.length === 0){
                console.log('No files found in ' + srcFolder);
                process.exit();
            }

            // resize
            files.forEach(function (file, index) {
                if ('.' === file.substr(0, 1)) {
                    return
                }

                let srcFilePath = path.join(srcFolder, file);
                let destFilePath = path.join(destFolder, file);

                sharp(srcFilePath)
                    .resize(resizeTo)
                    .toFile(destFilePath, (err, info) => {
                        if(err){
                            console.log('ERROR => ' + srcFilePath + ' => ' + destFilePath);
                            console.log(err);
                            console.log(info);
                        }else{
                            console.log('OK => ' + srcFilePath + ' => ' + destFilePath);
                        }

                    });
                i++;
            });
        });
    }else{
        console.log('Folder ' + destFolder + ' unfound.');
    }
}else{
    console.log('Folder ' + srcFolder + ' unfound.');
}
