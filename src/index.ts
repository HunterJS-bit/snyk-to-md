const minimist = require('minimist');
var readline = require('readline');

const argv = minimist(process.argv.slice(2));

let jsonString = '';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


async function readData() {
    return new Promise((resolve, reject) => {

        rl.on('line', (line: String) => {
            jsonString += line;
        }).on('close', () => {
            resolve('finished');
        }).on('error', (err: Object) => {
            reject(err);
        })

    });
}

(async function () {
    try {
        await readData();
        const data = JSON.parse(jsonString);
        console.log('Data read from input ');
        console.log(data.summary);

    } catch (e) {
        console.error(e);
    }
})()
