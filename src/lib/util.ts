var sortOrder = ['high', 'medium', 'low'];

export function sortMapVulnerabilities(data: any) {
    const sortedVulnerabilities = data.sort(function (a: any, b: any) {
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
            from: e.from.map((e: String) => `\`${e}\``).join(' > '),
            description: e.description,
            severity: e.severity.toUpperCase(),
            references: e.references,
            remediation: sentence[1],
        }
    })

    return mappedList;
}