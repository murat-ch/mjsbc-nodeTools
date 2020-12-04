const fs = require('fs');

const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, files) => {
    if (err) {
        console.log(err);
    }
    const statPromises = files.map((file) => {
        return lstat(file);
    });
    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        console.log(files[index], stats.isFile());
    }
});