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
        if (data.vulnerabilities) {
            console.log('Data read from input ');
            /*
            console.log(data[0].name);
            console.log(data[0].version);
            console.log(data[0].severity);
            */
            var sortOrder = ['h', 'm', 'l'];
            const sortedVulnerabilities = data.vulnerabilities.sort(function (a, b) {
                return sortOrder.indexOf(a.severity) - sortOrder.indexOf(b.severity);
            });
            /*
            const mappedList = sortedVulnerabilities.map(e => {
                return {
                    title: e.title,
                    packageVersion: e.version,
                    priority: e.severity }
            })
            */
            console.log(sortedVulnerabilities[0].description.search("# Remediation"));
            return;
        }
        console.log('No Vulnerabilities Found :)')

    } catch (e) {
        console.error(e);
    }
})()
