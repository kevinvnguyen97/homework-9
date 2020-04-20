function generateMarkdown(data) {
  return `# ${data.title}

${data.description}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Test](#test)
* [Github Profile Pic URL](#github-profile-pic-url)
* [Github Email](#github-email)


## Installation Instructions

${data.installation}


## Usage

${data.usage}


# Credits

${data.credits}


## License

${data.license}


## Contributing

${data.contributing}


## Test

${data.test}


## Github Profile Pic URL

${data.url}


## Github Email

${data.email}
`
}

module.exports = generateMarkdown;
