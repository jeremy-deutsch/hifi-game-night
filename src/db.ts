// TODO: add actual db layer

interface Data {
  game1Link: string | null;
  game2Link: string | null;
  game3Link: string | null;
}

const data: Data = { game1Link: null, game2Link: null, game3Link: null };

export async function setGame1Link(link: string) {
  data.game1Link = link;
}
export async function getGame1Link() {
  return data.game1Link;
}

export async function setGame2Link(link: string) {
  data.game2Link = link;
}
export async function getGame2Link() {
  return data.game2Link;
}

export async function setGame3Link(link: string) {
  data.game3Link = link;
}
export async function getGame3Link() {
  return data.game3Link;
}
