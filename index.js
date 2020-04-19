var questions = require("inquirer");
var readMeGenerator = require("./utils/generateMarkdown.js");

questions.prompt([
    // Input title
    {
        type: "input",
        message: "Project Title:",
        name: "title"
    },

    // Input description
    {
        type: "input",
        message: "Project Description:",
        name: "description"
    },

    // Input table of contents
    {
        type: "input",
        message: "Table of Contents:",
        name: "contents"
    },

    // Input installation description
    {
        type: "input",
        message: "Installation:",
        name: "installation"
    },

    // Input usage
    {
        type: "input",
        message: "Usage:",
        name: "usage"
    },

    // License
    {
        type: "list",
        message: "License:",
        name: "license",
        choices: [
            "Apache Lincense 2.0",
            "GNU General Public License 3.0",
            "MIT License"
        ]
    },

    // Contributing
    {
        type: "input",
        message: "Contributing:",
        name: "contributing"
    },

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
        name: "url"
    },

    {
         type: "input",
         message: "Github Email:",
         name: "email"
    }
]).then(function(response) {
    console.log(response);
    var generatedReadMe = readMeGenerator(response);

    var readMe = require("fs");
    readMe.writeFile("README.md", generatedReadMe, function(error) {
        if(error) {
            return console.log(error);
        }
        
        console.log("'README.md' generated!");
    });
});