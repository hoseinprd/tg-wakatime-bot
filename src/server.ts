import { Context, Telegraf } from 'telegraf';
import { api } from './api';
import { TOKEN, leaderboardsId } from './env';

const bot = new Telegraf(TOKEN, {
  telegram: {
    apiRoot: 'https://tgproxy-m.herokuapp.com/',
  },
});

bot.start(async (ctx: Context) => {
  const welcome = `👋 Hello, Welcome <b>${ctx.from?.first_name}</b>!\n🎯 This bot will give you latest stats of wakatime per weeks.\nPress /help to get the list of available commands.`;

  ctx.reply(welcome, {
    parse_mode: 'HTML',
  });
});

bot.help((ctx: Context) => {
  const text = `
  You can control me by sending these commands:
  /help - to see this help.
  /list_weekly - see list of best coder during current week



  Report <b>Bugs</b>: @Hoseinprd
  `;
  ctx.reply(text, {
    parse_mode: 'HTML',
  });
});

bot.command('list_weekly', async (ctx: Context) => {
  const {
    data: { data },
  } = await api.get<WakaTimeAPI>(`/users/current/leaderboards/${leaderboardsId}`);

  const bestCoder = data.slice(0, 3);

  const test = `🥇 ${bestCoder[0].user.full_name} \n⏳ <b>Daily Avg</b>: ${bestCoder[0].running_total.human_readable_daily_average}\n\n🥈 ${bestCoder[1].user.full_name} \n⏳ <b>Daily Avg</b>: ${bestCoder[1].running_total.human_readable_daily_average}\n\n🥉 ${bestCoder[2].user.full_name} \n⏳ <b>Daily Avg</b>: ${bestCoder[2].running_total.human_readable_daily_average}`;

  ctx.reply(test, {
    parse_mode: 'HTML',
  });
});

bot.launch();
