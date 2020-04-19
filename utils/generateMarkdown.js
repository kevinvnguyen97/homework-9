function generateMarkdown(data) {
  return `# ${data.title}

${data.description}

## Table of Contents
${data.contents}

## Installation Instructions
${data.installation}

## How to Use
${data.usage}

## License
${data.license}

## Contributors
${data.contributing}

## Github profile pic URL
${data.url}

## Github username
${data.email}
`
}

module.exports = generateMarkdown;
