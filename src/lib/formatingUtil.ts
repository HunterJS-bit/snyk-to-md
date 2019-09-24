interface VulnerablePackage {
    title?: String
    packageName?: String,
    from: String,
    packageManager: String,
    severity: String,
    remediation: String,
}

export function formatSnykReport(vulnerabilities: Array<VulnerablePackage>) {
    let reportContent = ``;
    vulnerabilities.forEach(el => {
        reportContent += `### ✗ ${el.title}\n\n`
            + `- Severity: ${el.severity} \n`
            + `- Vulnerable module: ${el.packageName}\n`
            + `- From: ${el.from}\n`
            + `- Remediation: ${el.remediation}\n`
            + `- Package Manager: ${el.packageManager}\n\n`;
    });
    return reportContent;
}