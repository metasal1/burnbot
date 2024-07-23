const TelegramBot = require('node-telegram-bot-api');
const web3 = require('@solana/web3.js');

const dotenv = require('dotenv');
dotenv.config();

const telegramToken = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
// const tokenMintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const tokenMintAddress = 'ErbakSHZWeLnq1hsqFvNz8FvxSzggrfyNGB6TEGSSgNE';

const bot = new TelegramBot(telegramToken, { polling: true });
const connection = new web3.Connection(process.env.RPC);

async function checkBurnTransactions() {
    const tokenMintPublicKey = new web3.PublicKey(tokenMintAddress);

    connection.onLogs(
        tokenMintPublicKey,
        async (logsResult) => {
            if (logsResult.err) {
                console.error('Error in transaction:', logsResult.err);
                return;
            }

            const burnLog = logsResult.logs.find(log => log.includes('Instruction: Burn'));
            if (burnLog) {
                const message = `
❤️‍🔥❤️‍🔥❤️‍🔥 Somebody just burnt some FABS! ❤️‍🔥❤️‍🔥❤️‍🔥\n
🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️ Let's Focking Run 🏃‍♂️🏃‍♂️🏃‍♂️\n
🐂🐂🐂 You run with the bulls, we run with the FABS! 🐂🐂🐂\n`;
                bot.sendMessage(chatId, message);
                console.log('Burn detected:', logsResult.signature);
            }
        }
    );
}

checkBurnTransactions();

console.log('Bot is running. Press Ctrl+C to stop.');