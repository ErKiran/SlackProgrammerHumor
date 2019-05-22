const axios = require('axios');
const SlackBot = require('slackbots');
const config = require('./config');

var bot = new SlackBot({
    token: config.token,
    name: `Programmer's Humor Bot`
});

bot.on('start', async msg => {
    const text = await getMaxVotedPost();
    const title = text[0].data.title;
    const url = text[0].data.url

    const attach = {
        "text": `${title}\n${url}`
    }
    bot.postMessageToChannel('random', '', attach);


})

async function getMaxVotedPost() {
    const res = await axios.get('https://www.reddit.com/r/ProgrammerHumor.json');
    const max = Math.max.apply(Math, res.data.data.children.map(i => i.data.ups));
    const tosubmit = res.data.data.children.filter(i => i.data.ups == max)
    return tosubmit;
}
