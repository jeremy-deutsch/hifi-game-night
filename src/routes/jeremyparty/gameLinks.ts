import type { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import {
  getGame1Link,
  setGame1Link,
  getGame2Link,
  setGame2Link,
  getGame3Link,
  setGame3Link,
} from "../../db";
import { buildRequestBody } from "../../helpers";

export async function get(req: unknown, res: ServerResponse) {
  const [game1Link, game2Link, game3Link] = await Promise.all([
    getGame1Link(),
    getGame2Link(),
    getGame3Link(),
  ]);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ game1Link, game2Link, game3Link }));
}

// TODO: make this configurable
const validDomains = new Set([
  "codenames.game",
  "www.codenames.game",
  "skribbl.io",
  "www.skribbl.io",
  "secrethitler.io",
  "www.secrethitler.io",
  "playingcards.io",
  "www.playingcards.io",
  "discord.gg",
  "www.discord.gg",
  "discord.com",
  "www.discord.com",
  "mafia.gg",
  "www.mafia.gg",
  "epicmafia.com",
  "www.epicmafia.com",
  "crazygames.com",
  "www.crazygames.com",
  "jackbox.tv",
  "www.jackbox.tv",
  "scattergoriesonline.net",
  "www.scattergoriesonline.net",
  "wordscatter.com",
  "www.wordscatter.com",
  "youtube.com",
  "www.youtube.com",
  "twitch.tv",
  "www.twitch.tv",
  "youtu.be",
  "www.youtu.be",
]);

export interface PutBody {
  game1Link?: string;
  game2Link?: string;
  game3Link?: string;
}

function isValidLink(maybeLink: any): maybeLink is string {
  if (typeof maybeLink !== "string") return false;
  if (maybeLink.length > 600) return false;
  try {
    const url = new URL(maybeLink);
    return validDomains.has(url.hostname);
  } catch (e) {
    return false;
  }
}

export async function put(
  req: IncomingMessage & { body: {} },
  res: ServerResponse,
  next: () => void
) {
  const data: PutBody = JSON.parse(await buildRequestBody(req));
  if (!data) next();
  const ops: Array<Promise<any>> = [];
  if (isValidLink(data.game1Link)) {
    ops.push(setGame1Link(data.game1Link));
  }
  if (isValidLink(data.game2Link)) {
    ops.push(setGame2Link(data.game2Link));
  }
  if (isValidLink(data.game3Link)) {
    ops.push(setGame3Link(data.game3Link));
  }
  await Promise.all(ops);
  await get(null, res);
}
