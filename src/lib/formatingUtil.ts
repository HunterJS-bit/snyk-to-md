interface Vulnerability {
    title?: String
    packageName?: String,
    from: String,
    packageManager: String
}

export function formatSnykReport(vulnerabilities: Array<Vulnerability>) {
    let reportContent = ``;
    vulnerabilities.forEach(el => {
        reportContent += `### ✗ ${el.title} 
- Introduced through: ${el.packageName}
- From: ${el.from} 
- Package Manager: ${el.packageManager}\n`;
    });
    return reportContent;
}