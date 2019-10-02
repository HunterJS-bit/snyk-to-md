import { VulnerablePackage } from '../common/types';


export function formatSnykReport(vulnerabilities: Array<VulnerablePackage>) {
    const date = new Date().toLocaleString();
    let reportContent = `# Snyk Report (${date})\n\n`;
    vulnerabilities.forEach(el => {
        const references = el.references;
        let ref = '';
        references.forEach(element => {
            ref += `    - [${element.title}](${element.url})\n`
        });
        reportContent += `### ✗ ${el.title}\n\n`
            + `- Severity: **${el.severity}** \n`
            + `- Package Manager: ${el.packageManager}\n`
            + `- Vulnerable module: \`${el.packageName}\`\n`
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