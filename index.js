var questions = require("inquirer");
var readMeGenerator = require("./utils/generateMarkdown.js");

title();

questions.prompt([
    // Input title
    {
        type: "input",
        message: "Project Title:",
        name: "title",
        default: "Project"
    },

    // Input description
    {
        type: "input",
        message: "Project Description (Type '\\n\\n' after paragraph for a new paragraph):",
        name: "description",
        default: "N/A"
    },

    // Input installation description
    {
        type: "input",
        message: "Installation (Type '\\n\\n' after paragraph for a new paragraph):",
        name: "installation",
        default: "N/A"
    },

    // Input usage
    {
        type: "input",
        message: "Usage (Type '\\n\\n' after paragraph for a new paragraph):",
        name: "usage",
        default: "N/A"
    },

    // License
    {
        type: "list",
        message: "License:",
        name: "license",
        choices: [
            "Apache License 2.0",
            "GNU General Public License 3.0",
            "MIT License"
        ],
    },

    // Contributing
    {
        type: "input",
        message: "Contributors (If adding multiple, separate w/ comma and space):",
        name: "contributors",
        default: "N/A"
    },

    // Tests
    {
        type: "confirm",
        message: "Include tests?:",
        name: "tests"
    },

    // Github URL
    {
        type: "input",
        message: "Github profile pic URL:",
        name: "url",
        default: "N/A"
    },

    {
         type: "input",
         message: "Github Email:",
         name: "email",
         default: "N/A"
    }
]).then(function(response) {
    //console.log(response);
    // Getting license info
    var fs = require("fs");
    setLicense(response, fs);

    response.contributors = splitContributors(response.contributors);

    if (response.tests) {
        response.tests = "[Generated README](generated_README.md)";
    }

    var generatedReadMe = readMeGenerator(response);

    if (!response.tests) {
        generatedReadMe.replace(`## Tests\n\n${response.tests}\n\n\n`, "");
    }

    writeToFile(generatedReadMe, fs);
});

function title() {
    // Title
    console.log("Kevin's README Generator\n");
    console.log("Generate your own professional README for better instructions");
    console.log("of your own program.\n");
}

function setLicense(res, fs) {
    var licenseLocation;
    console.log(`Chosen license: ${res.license}`);
    if (res.license === "Apache License 2.0") {
        licenseLocation = "./licenses/apache_2.txt";
        licenseTxt = readLicense(licenseLocation, fs);
        res.license = licenseTxt.replace("[yyyy]", new Date().getFullYear())
                        .replace("[name of copyright owner]", res.contributors);
    }

    else if (res.license === "GNU General Public License 3.0") {
        licenseLocation = "./licenses/gnu_v3.txt";
        licenseTxt = readLicense(licenseLocation, fs);
        res.license = licenseTxt.replace("<one line to give the program's name and a brief idea of what it does.>", res.title)
                        .replace("<year>", new Date().getFullYear())
                        .replace("<name of author>", res.contributors);
    }

    else {
        licenseLocation = "./licenses/mit.txt";
        licenseTxt = readLicense(licenseLocation, fs);
        res.license = licenseTxt.replace("[year]", newDate().getFullYear())
                        .replace("[fullname]", res.contributors);
    }
}

function readLicense(license, readFs) {
    var licenseText = readFs.readFileSync(license, "utf8", function(error) {
        if(error) {
            return console.log(error);
        }
    });

    return licenseText;
}

function splitContributors(contributorList) {
    contributorList = contributorList.split(", ");
    console.log(contributorList);

    var contributorsTxt = "";
    for(var i = 0; i < contributorList.length; i++) {
        contributorsTxt += `* ${contributorList[i]}`;
        if (i !== contributorList.length - 1) {
            contributorsTxt += "\n";
        }
    }

    console.log(contributorsTxt);

    return contributorsTxt;
}

function writeToFile(readmeTxt, fs) {
    fs.writeFileSync("generated_README.md", readmeTxt, function(error) {
        if(error) {
            return console.log(error);
        }
        
        console.log("'generated_README.md' generated!");
    });
}