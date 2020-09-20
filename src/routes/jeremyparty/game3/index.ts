import type { IncomingMessage, ServerResponse } from "http";
import { getGame2Link } from "../../../db";

export async function get(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) {
  const game1Link = await getGame2Link();

  if (!game1Link) return next();
  res.writeHead(302, { Location: game1Link });
  res.end();
}
