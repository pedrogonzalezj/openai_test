#!/usr/bin/env node

const yargs = require('yargs')
const { Configuration, OpenAIApi } = require("openai")

const argv = yargs(process.argv.slice(2))
  .option('prompt', {
    alias: 'p',
    describe: 'Prompt message for our IA friend.',
    demandOption: true
  })
  .help()
  .argv

const promptMessage = argv.p
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
const model = process.env.OPENAI_MODEL  
const openai = new OpenAIApi(configuration)

async function main (openai, model, promptMessage) {
  console.log('Asking OpenAI ...')  
  try {
    const response = await openai.createCompletion({
        model: model,
        prompt: promptMessage,
        temperature: 0,
        max_tokens: 1
      })
    console.log(JSON.stringify(response.data))
  } catch (error) {
    if (error.response) {
      console.log(`Something failed while calling OpenAI API. Status ${error.response.status}. Data: ${JSON.stringify(error.response.data)}`)
    } else {
      console.log(`Something failed while calling OpenAI API. Status ${error.message}`)
    }
  }
  
  
  console.log('Finished. Bye')
}

main(openai, model, promptMessage).catch(console.dir)