function generateMarkdown(data) {
  return `# ${data.title}

${data.description}


## Table of Contents
* [Installation] (#installation)
* [Usage] (#usage)
* [Credits] (#credits)
* [License] (#license)
* [Contributors] (#contributors)
* [Github Profile Pic URL] (#profile-pic)
* [Github Email] (#email)


## Installation Instructions

${data.installation}


## How to Use

${data.usage}


## License

${data.license}


## Contributors

${data.contributors}


## Github Profile Pic URL

${data.url}


## Github Email

${data.email}
`
}

module.exports = generateMarkdown;
