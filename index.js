var questions = require("inquirer");
var readMeGenerator = require("./utils/generateMarkdown.js");

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
        message: "Project Description:",
        name: "description",
        default: "N/A"
    },

    // Input installation description
    {
        type: "input",
        message: "Installation:",
        name: "installation",
        default: "N/A"
    },

    // Input usage
    {
        type: "input",
        message: "Usage:",
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
        message: "Contributors:",
        name: "contributors",
        default: "N/A"
    },

    // {
    //     type: "confirm",
    //     message: "Add more contributors?",

    // },

    // // Tests
    // {
    //     type: "input",
    //     message: "Tests:",
    //     name: "tests"
    // },

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
    var read = require("fs");
    var licenseLocation;

    console.log(`Chosen license: ${response.license}`);
    if (response.license === "Apache License 2.0") {
        licenseLocation = "./licenses/apache_2.txt";
        licenseTxt = readLicense(licenseLocation, read);
        response.license = licenseTxt.replace("[yyyy]", new Date().getFullYear())
                           .replace("[name of copyright owner]", response.contributors);
    }

    else if (response.license === "GNU General Public License 3.0") {
        licenseLocation = "./licenses/gnu_v3.txt";
        licenseTxt = readLicense(licenseLocation, read);
        response.license = licenseTxt.replace("<one line to give the program's name and a brief idea of what it does.>", response.title)
                                     .replace("<year>", new Date().getFullYear())
                                     .replace("<name of author>", response.contributors);
    }

    else {
        licenseLocation = "./licenses/mit.txt";
        licenseTxt = readLicense(licenseLocation, read);
        response.license = licenseTxt.replace("[year]", newDate().getFullYear())
                           .replace("[fullname]", response.contributors);
    }

    var generatedReadMe = readMeGenerator(response);
    read.writeFileSync("generated_README.md", generatedReadMe, function(error) {
        if(error) {
            return console.log(error);
        }
        
        console.log("'generated_README.md' generated!");
    });
});

function readLicense(license, readFs) {
    var licenseText = readFs.readFileSync(license, "utf8", function(error, apacheText) {
        if(error) {
            return console.log(error);
        }
    });

    return licenseText;
}