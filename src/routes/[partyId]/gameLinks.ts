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

export async function get(
  req: { params: { partyId: string } },
  res: ServerResponse
) {
  const partyId = req.params.partyId;
  const [game1Link, game2Link, game3Link] = await Promise.all([
    getGame1Link(partyId),
    getGame2Link(partyId),
    getGame3Link(partyId),
  ]);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ game1Link, game2Link, game3Link }));
}

// TODO: make this configurable
const validDomains = new Set(
  [
    "codenames.game",
    "skribbl.io",
    "secrethitler.io",
    "playingcards.io",
    "discord.gg",
    "discord.com",
    "mafia.gg",
    "epicmafia.com",
    "crazygames.com",
    "jackbox.tv",
    "scattergoriesonline.net",
    "wordscatter.com",
    "youtube.com",
    "twitch.tv",
    "youtu.be",
  ].flatMap((url) => [url, "www." + url])
);

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
  req: IncomingMessage & { body: {}; params: { partyId: string } },
  res: ServerResponse,
  next: () => void
) {
  const partyId = req.params.partyId;
  const data: PutBody = JSON.parse(await buildRequestBody(req));
  if (!data) next();
  const ops: Array<Promise<any>> = [];
  if (isValidLink(data.game1Link)) {
    ops.push(setGame1Link(partyId, data.game1Link));
  }
  if (isValidLink(data.game2Link)) {
    ops.push(setGame2Link(partyId, data.game2Link));
  }
  if (isValidLink(data.game3Link)) {
    ops.push(setGame3Link(partyId, data.game3Link));
  }
  await Promise.all(ops);
  return await get(req, res);
}
