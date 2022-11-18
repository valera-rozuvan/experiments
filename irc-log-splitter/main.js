var lineReader = require('line-reader'),
    path = require('path'),
    fs = require('fs'),
    fsOptions = { encoding: 'utf8' },
    logPath, outFolderPath;

if (process.argv.length <= 3) {
    console.log('Need to specify log path and output folder path.');

    return;
}

logPath = path.normalize(process.argv[2]);
outFolderPath = path.normalize(process.argv[3]);

lineReader.eachLine(logPath, fsOptions, function(line, last, cb) {
    // line is a single line form the IRC text log file.
    // Examples properly formatted lines:
    //
    //     2016-01-08T18:47:26  <UserName> Text message from user.
    //     2016-01-08T16:48:52  *** UserName <UserName!~UserName@124.78.116.28> has joined #channel_name

    var fullDate = line.substr(0, line.indexOf(' ')),
        message = line.substr(line.indexOf(' ') + 2),
        date, time, newLogFileName, lineToAppend;

    date = fullDate.substr(0, 10);
    time = fullDate.substr(11, 10);

    newLogFileName = outFolderPath + '/' + date + '.log';
    lineToAppend = line + '\n';

    fs.appendFile(newLogFileName, lineToAppend, fsOptions, function (err) {
        if (err) {
            cb(false); // Stop reading log file.

            throw err;
        }

        cb(); // Continue reading log file.
    });
});

return;
