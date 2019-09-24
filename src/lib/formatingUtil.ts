interface VulnerablePackage {
    title?: String
    packageName?: String,
    from: String,
    packageManager: String,
    severity: String,
    remediation: String,
    references: Array<References>,
}

interface References {
    title: String,
    url: String,
}

export function formatSnykReport(vulnerabilities: Array<VulnerablePackage>) {
    let reportContent = ``;
    vulnerabilities.forEach(el => {
        const references = el.references;
        let ref = '';
        references.forEach(element => {
            ref += `    - [${element.title}](${element.url})\n`
        });
        reportContent += `### ✗ ${el.title}\n\n`
            + `- Severity: **${el.severity}** \n`
            + `- Package Manager: ${el.packageManager}\n`
            + `- Vulnerable module: ${el.packageName}\n`
            + `- From: ${el.from}\n`
            + `- Remediation: ${el.remediation}\n`
            + `- References: \n`
            + `${ref}`
            + '\n'
            + `---`
            + '\n';
    });
    return reportContent;
}