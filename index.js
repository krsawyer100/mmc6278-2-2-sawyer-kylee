const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "./quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => { 
    try {
      // TODO: Pull a random quote from the quotes.txt file
      const fileContent = await(fs.readFile(QUOTE_FILE, "UTF-8"))
      var quotes = fileContent.split("\n").filter(e=>e)
      var randomQuote = Math.floor(Math.random() * quotes.length)
      var [quote, author] = quotes[randomQuote].split('|')
      // You may style the text with chalk as you wish
      const displayQuote = [chalk.blue(quote), chalk.cyan.bold(author)]
      // console log the quote and author
      console.log(displayQuote.join(chalk.cyan.bold('|')))
    } catch(err) {
      console.log(err)
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      // TODO: Add the quote and author to the quotes.txt file
      var fileContent = await(fs.readFile(QUOTE_FILE, "UTF-8"))
      console.log(typeof(fileContent))
      fileContent = fileContent.slice(0, fileContent.length -1)
      if (author === null || author === undefined) {
        author = 'Anonymous'
      }
      var newQuote = [quote, author]
      const addQuote = await(fs.writeFile(QUOTE_FILE, fileContent.concat(newQuote.join('|').concat("\n\n"))))

      console.log(chalk.green.bold('Quote was successfully added!'))

      // If no author is provided,
      // save the author as "Anonymous".
      // After the quote/author is saved,
      // alert the user that the quote was added.
      // You may style the text with chalk as you wish
      // HINT: You can store both author and quote on the same line using
      // a separator like pipe | and then using .split() when retrieving
    } catch(err) {
      console.log(err)
    }
  });

program.parse();
