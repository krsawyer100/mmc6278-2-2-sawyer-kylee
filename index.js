const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

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
      //Reads quote.txt file content
      const fileContent = await fs.readFile(QUOTE_FILE, "UTF-8")
      //Splits file content by line and filters out blank lines
      const quotes = fileContent.split("\n").filter(e=>e)
      //generated a random whole number that is equal to one of the line numbers
      const randomQuote = Math.floor(Math.random() * quotes.length)
      //splits a random quote into two consts
      const [quote, author] = quotes[randomQuote].split('|')
      //joins the quote and author and adds chalk styling
      // You may style the text with chalk as you wish
      const displayQuote = `${chalk.blue(quote)}${chalk.cyan.bold('|')}${chalk.cyan.bold(author)}` 
      // console log the quote and author/displays quote
      console.log(displayQuote)
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
      //reads the quote.txt file
      let fileContent = await fs.readFile(QUOTE_FILE, "UTF-8")
      //deletes blank line at the end of the file
      fileContent = fileContent.slice(0, fileContent.length -1)
      // If no author is provided,
      // save the author as "Anonymous".
      //makes author = anonymous if no author is provided
      if (author === null || author === undefined) {
        author = 'Anonymous'
      }
      //makes an array of the quote and author provided by user
      const newQuote = [quote, author]
      //writes the current quotes plus the new quote + author in the quote file and moves to the next line after
      await fs.writeFile(QUOTE_FILE, fileContent.concat(newQuote.join('|').concat("\n\n")))
      // After the quote/author is saved,
      // alert the user that the quote was added.
      // You may style the text with chalk as you wish
      //console.log telling the user they added the quote with chalk styling
      console.log(chalk.green.bold('Quote was successfully added!'))
      // HINT: You can store both author and quote on the same line using
      // a separator like pipe | and then using .split() when retrieving
    } catch(err) {
      console.log(err)
    }
  });

program.parse();
