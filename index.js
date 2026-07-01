const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// متغير بسيط لحفظ الرصيد (ملاحظة: البيانات تضيع إذا طفى البوت)
let bank = {};

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    const args = message.content.split(' ');
    const cmd = args[0];
    const user = message.author.id;

    if (!bank[user]) bank[user] = 0;

    if (cmd === '!ping') {
        message.reply('البوت شغال وبكامل قوته! 🚀');
    }

    if (cmd === '!help') {
        message.reply('الأوامر المتاحة:\n!ping - فحص البوت\n!balance - معرفة رصيدك\n!deposit [المبلغ] - إيداع مبلغ\n!withdraw [المبلغ] - سحب مبلغ');
    }

    if (cmd === '!balance') {
        message.reply(`رصيدك الحالي هو: ${bank[user]} ريال.`);
    }

    if (cmd === '!deposit') {
        const amount = parseInt(args[1]);
        if (isNaN(amount)) return message.reply('يرجى تحديد مبلغ صحيح.');
        bank[user] += amount;
        message.reply(`تم إيداع ${amount} ريال. رصيدك الجديد: ${bank[user]}`);
    }

    if (cmd === '!withdraw') {
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount > bank[user]) return message.reply('رصيدك غير كافي أو المبلغ غير صحيح.');
        bank[user] -= amount;
        message.reply(`تم سحب ${amount} ريال. رصيدك الجديد: ${bank[user]}`);
    }
});

client.login(process.env.TOKEN);
