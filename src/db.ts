// TODO: add actual db layer

interface Data {
  [partyId: string]: PartyData;
}

interface PartyData {
  game1Link: string | null;
  game2Link: string | null;
  game3Link: string | null;
}

const data: Data = {
  jeremyparty: { game1Link: null, game2Link: null, game3Link: null },
};

export async function setGame1Link(partyId: string, link: string) {
  if (!data[partyId]) throw new Error("Invalid party ID");
  data[partyId].game1Link = link;
}
export async function getGame1Link(partyId: string) {
  return data[partyId]?.game1Link ?? null;
}

export async function setGame2Link(partyId: string, link: string) {
  if (!data[partyId]) throw new Error("Invalid party ID");
  data[partyId].game2Link = link;
}
export async function getGame2Link(partyId: string) {
  return data[partyId]?.game2Link ?? null;
}

export async function setGame3Link(partyId: string, link: string) {
  if (!data[partyId]) throw new Error("Invalid party ID");
  data[partyId].game3Link = link;
}
export async function getGame3Link(partyId: string) {
  return data[partyId]?.game3Link ?? null;
}
