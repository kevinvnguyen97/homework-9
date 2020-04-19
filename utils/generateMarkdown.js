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

<a name="installation"></a>
## Installation Instructions

${data.installation}

<a name="usage"></a>
## How to Use

${data.usage}

<a name="license"></a>
## License

${data.license}

<a name="contributors"></a>
## Contributors

${data.contributors}

<a name="profile-pic"></a>
## Github Profile Pic URL

${data.url}

<a name="email"></a>
## Github Email

${data.email}
`
}

module.exports = generateMarkdown;
