const minimist = require('minimist');
const readline = require('readline');
const formatingUtil = require('./lib/formatingUtil');
const util = require('./lib/util');
const fs = require('fs');

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
        if (data.vulnerabilities) {
            console.log('Data read from input ');

            const mappedList = util.sortMapVulnerabilities(data.vulnerabilities);

            const formatedOutput = formatingUtil.formatSnykReport(mappedList);

            fs.writeFile('./Snyk_Report.md', formatedOutput, (err: any) => {
                if (err) {
                    console.error(err)
                    return;
                }
            });


            return;
        }
        console.log('No Vulnerabilities Found :)')

    } catch (e) {
        console.error(e);
    }
})()
