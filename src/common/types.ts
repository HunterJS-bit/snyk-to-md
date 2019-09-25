/**
 * File model stuff
 */
export interface References {
    title: String,
    url: String,
}

export interface VulnerablePackage {
    title?: String
    packageName?: String,
    from: String,
    packageManager: String,
    severity: String,
    remediation: String,
    references: Array<References>,
}