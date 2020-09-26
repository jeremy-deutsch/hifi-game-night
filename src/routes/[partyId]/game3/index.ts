import type { IncomingMessage, ServerResponse } from "http";
import { getGame3Link } from "../../../db";

export async function get(
  req: IncomingMessage & { params: { partyId: string } },
  res: ServerResponse,
  next: () => void
) {
  const game3Link = await getGame3Link(req.params.partyId);

  if (!game3Link) return next();
  res.writeHead(302, { Location: game3Link });
  res.end();
}
