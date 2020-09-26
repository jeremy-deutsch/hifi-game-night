import type { IncomingMessage, ServerResponse } from "http";
import { getGame1Link } from "../../../db";

export async function get(
  req: IncomingMessage & { params: { partyId: string } },
  res: ServerResponse,
  next: () => void
) {
  const game1Link = await getGame1Link(req.params.partyId);

  if (!game1Link) return next();
  res.writeHead(302, { Location: game1Link });
  res.end();
}
