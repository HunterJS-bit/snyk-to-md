const minimist = require('minimist');
const readline = require('readline');
const formatingUtil = require('./lib/formatingUtil');
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

            var sortOrder = ['h', 'm', 'l'];
            const sortedVulnerabilities = data.vulnerabilities.sort(function (a: any, b: any) {
                return sortOrder.indexOf(a.severity) - sortOrder.indexOf(b.severity);
            });
            const mappedList = sortedVulnerabilities.map((e: any) => {
                const index = e.description.indexOf('## Remediation');
                const sentence = e.description.substring(index).split('\n\n');
                return {
                    title: e.title,
                    packageName: e.name,
                    packageVersion: e.version,
                    priority: e.severity,
                    packageManager: e.packageManager,
                    from: e.from.join(' > '),
                    description: e.description,
                    severity: e.severity.toUpperCase(),
                    references: e.references,
                    remediation: sentence[1]
                }
            })

            const formatedOutput = formatingUtil.formatSnykReport(mappedList);


            fs.writeFile('./test.md', formatedOutput, (err: any) => {
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
