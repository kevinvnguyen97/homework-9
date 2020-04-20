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

    // Input credits
    {
        type: "input",
        message: "Credits (If adding multiple, separate w/ comma and space):",
        name: "credits",
        default: "none"
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
        type: "confirm",
        message: "Include Contributing Code of Conduct?:",
        name: "contributing"
    },

    // Tests
    {
        type: "confirm",
        message: "Include generated README test?:",
        name: "test"
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

    if(response.credits === "" || response.credits === null) {
        response.credits = "none";
    }
    response.credits = splitCredits(response.credits);

    if (response.test) {
        response.test = "[Generated README](generated_README.md)";
    }

    if (response.contributing) {
        response.contributing = read("./code_of_conduct.txt", fs);
    }

    var generatedReadMe = readMeGenerator(response);

    if (!response.test && !response.contributing) {
        generatedReadMe = generatedReadMe.replace("\n* [Test](#test)", "").replace(`## Test\n\nfalse\n\n\n`, "")
                                        .replace("\n* [Contributing](#contributing", "").replace(`## Contributing\n\nfalse\n\n\n`, "");
    }
    else if (!response.test) {
        generatedReadMe = generatedReadMe.replace("\n* [Test](#test)", "").replace(`## Test\n\nfalse\n\n\n`, "");
    }
    else if (!response.contributing) {
        generatedReadMe = generatedReadMe.replace("\n* [Contributing](#contributing", "").replace(`## Contributing\n\nfalse\n\n\n`, "");
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
    if (res.license === "Apache License 2.0") {
        licenseLocation = "./licenses/apache_2.txt";
        licenseTxt = read(licenseLocation, fs);
        res.license = licenseTxt.replace("[yyyy]", new Date().getFullYear())
                        .replace("[name of copyright owner]", res.credits);
    }

    else if (res.license === "GNU General Public License 3.0") {
        licenseLocation = "./licenses/gnu_v3.txt";
        licenseTxt = read(licenseLocation, fs);
        res.license = licenseTxt.replace("<one line to give the program's name and a brief idea of what it does.>", res.title)
                        .replace("<year>", new Date().getFullYear())
                        .replace("<name of author>", res.credits);
    }

    else {
        licenseLocation = "./licenses/mit.txt";
        licenseTxt = read(licenseLocation, fs);
        res.license = licenseTxt.replace("[year]", newDate().getFullYear())
                        .replace("[fullname]", res.credits);
    }
}

function read(txt, readFs) {
    var text = readFs.readFileSync(txt, "utf8", function(error) {
        if(error) {
            return console.log(error);
        }
    });

    return text;
}

function splitCredits(creditsList) {
    creditsList = creditsList.split(", ");

    var creditsTxt = "";
    for(var i = 0; i < creditsList.length; i++) {
        creditsTxt += `* ${creditsList[i]}`;
        if (i !== creditsList.length - 1) {
            creditsTxt += "\n";
        }
    }
    return creditsTxt;
}

function writeToFile(readmeTxt, fs) {
    fs.writeFileSync("generated_README.md", readmeTxt, function(error) {
        if(error) {
            return console.log(error);
        }
        
        console.log("'generated_README.md' generated!");
    });
}