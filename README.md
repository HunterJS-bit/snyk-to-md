# Snyk JSON to MD Mapper

The Snyk JSON to HTML Mapper takes the json outputted from `snyk test --json` and creates a local formatted MD file displaying the vulnerabilities discovered.

# How do I use it?

## Install or clone

First, Install the Snyk to MD using npm:

`npm install snyk-to-md -g`

## Generate the MD report

Change directory to your package's json root folder, then use of the two ways below to generate the MD report.

1. Directly streaming the results to snyk-to-md:

   Run the following line to create a file called `Snyk.md`:
   
   `snyk test --json | snyk-to-md -o ./report/Snyk.md`

2. Using a temporary file:

   Or just run:

   `snyk test --json | snyk-to-md`

   And it will create **Snyk_Report.md** in directory

## View the HTML report

   Simply open your new file (`Snyk_Report.md` above) and enjoy.

### License

[License: Apache License, Version 2.0](LICENSE)