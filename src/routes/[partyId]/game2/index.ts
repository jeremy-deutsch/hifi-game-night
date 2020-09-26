import type { IncomingMessage, ServerResponse } from "http";
import { getGame2Link } from "../../../db";

export async function get(
  req: IncomingMessage & { params: { partyId: string } },
  res: ServerResponse,
  next: () => void
) {
  const game2Link = await getGame2Link(req.params.partyId);

  if (!game2Link) return next();
  res.writeHead(302, { Location: game2Link });
  res.end();
}
