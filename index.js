#! /usr/bin/env node
import inquirer from "inquirer"; //inquirer: Used to create interactive prompts in the command line.
import chalk from "chalk"; //chalk: Used to add color and formatting to text displayed in the console.
import chalkAnimation from "chalk-animation"; //chalk-animation: Used to create fancy text animations.
let n;
let turn;
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
async function welcome() {
    //The welcome function is an async function, meaning it can handle asynchronous operations (like waiting).
    let title = chalkAnimation.karaoke("\nInitializing\n\n"); //It uses chalkAnimation to display animated message
    await sleep(); //delay created by sleep,
    title.stop(); //stop animation
    title = chalkAnimation.pulse("=============================================================\n\n");
    await sleep();
    title.stop();
    title = chalkAnimation.karaoke("Your Game is ready\nGet ready to play\n");
    await sleep();
    title.stop();
}
await welcome();
async function gameMode() {
    const mode = await inquirer.prompt([
        {
            name: "modeSelect",
            type: "list",
            message: chalk.cyanBright.bold.italic("Please select mode you want to play"),
            choices: [
                chalk.green("Easy"),
                chalk.yellow("Medium"),
                chalk.red("Hard"),
                chalk.magenta("Custom"),
            ],
        },
    ]);
    if (mode.modeSelect == chalk.green("Easy")) {
        console.log(chalk.green `
You have selected Easy mode.
You have 5 turn.
Guess a number between 1 - 2\n`);
        (n = 2), (turn = 5);
        await truns(turn, n);
    }
    else if (mode.modeSelect == chalk.yellow("Medium")) {
        console.log(chalk.yellow `
You have selected Medium mode.
You have 10 turn.
Guess a number between 1 - 6\n`);
        n = 6;
        turn = 10;
        await truns(turn, n);
    }
    else if (mode.modeSelect == chalk.red("Hard")) {
        console.log(chalk.red `
You have selected Hard mode.
You have 20 turn.
Guess a number betweem 1 - 10\n`);
        n = 10;
        turn = 20;
        await truns(turn, n);
    }
    else if (mode.modeSelect == chalk.magenta("Custom")) {
        await customMode();
    }
    else {
        console.log("Invalid input!Please select again.");
        await gameMode();
    }
}
async function userInput() {
    let input = await inquirer.prompt([
        {
            type: "number",
            name: "guess",
            message: chalk.cyanBright.bold.italic("Enter your guessed number:"),
        },
    ]);
    return input.guess;
}
async function computerGuess(temp_var) {
    const randomNumber = Math.floor(Math.random() * temp_var + 1);
    return randomNumber;
    console.log(randomNumber);
}
async function truns(turn, n) {
    for (let i = 1; i <= turn; i++) {
        const randomNumber = await computerGuess(n);
        //console.log(randomNumber);
        const userInputNumber = await userInput();
        if (randomNumber == userInputNumber) {
            let title2 = chalkAnimation.rainbow(` 
█▓▒▒░░𝓒𝓸𝓷𝓰𝓻𝓪𝓽𝓾𝓵𝓪𝓽𝓲𝓸𝓷𝓼░░░▒▒▓█
            `);
            await sleep();
            title2.stop();
            console.log(chalk.gray("You have guessed the right number"));
            let turnLeft = turn - i;
            console.log(chalk.gray("No of turns left:"), turnLeft);
            break;
        }
        else {
            console.log(`\nYour guess is incorrect.Right number is ${randomNumber}\n`);
            await gameOver(i);
        }
    }
}
async function gameOver(i) {
    if (i == turn) {
        let title = chalkAnimation.rainbow(`░G░a░m░e░ ░O░v░e░r░`);
        await sleep();
        title.stop();
        console.log(chalk.gray("\nYou have used all your turns.\n"));
    }
}
async function customMode() {
    console.log(chalk.magenta.bold.italic("\nYou have selected Costum mood"));
    const custom = await inquirer.prompt([
        {
            name: "num",
            type: "number",
            message: chalk.magenta.bold.italic("\nDear user, please specify the upper limit of the range, beginning from 1, within which you'll be guessing"),
        },
        {
            name: "Turn",
            type: "number",
            message: chalk.magenta.bold.italic("\nEnter number of turns you required"),
        },
    ]);
    console.log(" ");
    n = custom.num;
    turn = custom.Turn;
    console.log(chalk.magenta(`
You have ${custom.Turn} turn.
Guess a number between 1 - ${custom.num}\n`));
    await truns(turn, n);
}
async function restart() {
    do //The restartfunction uses a loop to keep asking the user if they want to play again.
     {
        //do-while loop is used so that it must perform operation once
        await gameMode();
        var again = await inquirer.prompt({
            type: "list",
            name: "select",
            message: chalk.cyanBright.bold.italic("Do you want to  again?"),
            choices: [chalk.grey("Yes"), chalk.grey("No")],
        });
    } while (again.select == chalk.grey("Yes"));
}
await restart();
