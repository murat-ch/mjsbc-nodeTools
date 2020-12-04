const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const { lstat } = fs.promises;

// Set default current working directory if no argument passed in command-line
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
    if (err) {
        console.log(err);
    }
    const statPromises = files.map((file) => {
        return lstat(path.join(targetDir, file));
    });
    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        if (stats.isFile()) {
            console.log(chalk.cyan.italic(files[index]));
        } else {
            console.log(chalk.magentaBright.bold(files[index]));
        }
    }
});