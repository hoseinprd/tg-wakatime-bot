import { Context, Telegraf } from 'telegraf';
import { api } from './api';
import { TOKEN, leaderboardsId } from './env';

const bot = new Telegraf(TOKEN, {
  telegram: {
    apiRoot: 'https://tgproxy-m.herokuapp.com/',
  },
});

bot.start(async (ctx: Context) => {
  const { data } = await api.get<WakaTimeAPI>(`/users/current/leaderboards/${leaderboardsId}`);
  console.log(data.data);
  ctx.reply('1');
});

bot.launch();
