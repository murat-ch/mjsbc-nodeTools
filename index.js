#!/usr/bin/env node


const fs = require('fs');
const util = require('util');


// Option 2.2
// const lstat = util.promisify(fs.lstat);

// Option 2.3
// const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, files) => {
    if (err) {
        console.log(err);
    }
    for (const file of files) {
        try {
            const stats = await lstat(file);
            console.log(file, stats.isFile());
        } catch (e) {
            console.log(e);
        }

    }
});

// Option 2.1 Manually wrap into Promise.
const lstat  = (filename) => {
    return new Promise((resolve, reject)=> {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        })
    });
}

/*

        Option 1. Maintain an array of the results fom each lstat. As each callback is invoked, add the stats object to this
        array. When array is full, log everything in it.

const allStats = Array(files.length).fill(null);
for (let file of files) {
    const index = files.indexOf(file);

    fs.lstat(file, (err, stats) => {
        if (err) {
            console.log(err);
        } else {

            allStats[index] = stats;
            const ready = allStats.every((stats) => {
                return stats;
            });
            if (ready) {
                allStats.forEach((stats, index) => {
                    console.log(files[index], stats.isFile());
                })
            }
        }
    })
}

 */