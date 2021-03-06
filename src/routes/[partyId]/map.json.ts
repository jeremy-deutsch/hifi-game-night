import type { ServerResponse } from "http";

const { PORT, NODE_ENV, BASE_URL } = process.env;
const dev = NODE_ENV === "development";

const baseURLStart = dev ? `localhost:${PORT}` : BASE_URL;

const baseURL = baseURLStart + "/jeremyparty";

interface Landmark {
  name: string;
  positionSU: { x: number; y: number; z: 0 };
  hexColor: string;
  textHexColor?: string;
  href?: string;
  // only one link can have autoplay: true per map
  autoplay?: boolean;
  // only a youtube link can have audioOnly: true
  audioOnly?: boolean;
}

interface LandmarkRectangle extends Landmark {
  widthSU: number;
  heightSU: number;
  rotationDegrees?: number;
  imageHref?: string;
  radiusSU?: never;
}

interface LandmarkCircle extends Landmark {
  radiusSU: number;
  widthSU?: never;
}

interface MapData {
  author?: string;
  mapsJSONVersion: "v1.1.0";
  comments?: string;
  maps: Array<{
    mapName: string;
    mapImageSrc: string;
    mapLandmarks: Array<LandmarkRectangle | LandmarkCircle>;
  }>;
}

export async function get(req: unknown, res: ServerResponse) {
  const mapData: MapData = {
    author: "Game Night",
    mapsJSONVersion: "v1.1.0",
    comments: "A map for your game night",
    maps: [
      {
        mapName: "Game Night Map",
        mapImageSrc:
          "https://hifi-content.s3.amazonaws.com/Background_Images/garden5.jpg",
        mapLandmarks: [
          // note: the center is around 23 units
          {
            // game 1
            name: "Play",
            positionSU: {
              x: 11,
              y: 11,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game1`,
            imageHref: `${baseURLStart}/play-icon.png`,
          },
          {
            // edit game 1
            name: "",
            positionSU: {
              x: 13,
              y: 11,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game1/edit`,
            imageHref: `${baseURLStart}/write.png`,
          },
          {
            // game 2
            name: "Play",
            positionSU: {
              x: 34,
              y: 13,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game2`,
            imageHref: `${baseURLStart}/play-icon.png`,
          },
          {
            // edit game 2
            name: "",
            positionSU: {
              x: 36,
              y: 13,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game2/edit`,
            imageHref: `${baseURLStart}/write.png`,
          },
          {
            // game 3
            name: "Play",
            positionSU: {
              x: 12,
              y: 34,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game3`,
            imageHref: `${baseURLStart}/play-icon.png`,
          },
          {
            // edit game 3
            name: "",
            positionSU: {
              x: 14,
              y: 34,
              z: 0,
            },
            widthSU: 1,
            heightSU: 1,
            hexColor: "#ffffff80",
            textHexColor: "#000000ff",
            href: `${baseURL}/game3/edit`,
            imageHref: `${baseURLStart}/write.png`,
          },
          {
            name: "Help",
            positionSU: {
              x: 19,
              y: 21,
              z: 0,
            },
            radiusSU: 2,
            hexColor: "#000000",
            href: `${baseURLStart}/help`,
          },
          // {
          //   name: "Burning Man",
          //   positionSU: {
          //     x: 20,
          //     y: 20,
          //     z: 0,
          //   },
          //   radiusSU: 2,
          //   hexColor: "#000000",
          //   href: "https://burningman.org/",
          // },
          // {
          //   name: "example.com",
          //   positionSU: {
          //     x: 20,
          //     y: 25,
          //     z: 0,
          //   },
          //   widthSU: 1,
          //   heightSU: 3,
          //   rotationDegrees: 45,
          //   hexColor: "#AA0000",
          //   textHexColor: "#CCCCCC",
          //   href: "https://example.com/",
          // },
          // {
          //   name: "Transparent Landmark",
          //   positionSU: {
          //     x: 20,
          //     y: 30,
          //     z: 0,
          //   },
          //   radiusSU: 2,
          //   hexColor: "#00000000",
          //   href: "https://google.com/",
          // },
          // {
          //   name: "👽",
          //   positionSU: {
          //     x: 20,
          //     y: 35,
          //     z: 0,
          //   },
          //   radiusSU: 0.8,
          //   hexColor: "#CEE3F8",
          //   href: "https://reddit.com/",
          // },
          // {
          //   name: "No Link",
          //   positionSU: {
          //     x: 20,
          //     y: 40,
          //     z: 0,
          //   },
          //   radiusSU: 1.2,
          //   hexColor: "#fcba03",
          //   textHexColor: "#AAAAAA",
          // },
          // {
          //   name: " ",
          //   positionSU: {
          //     x: 20,
          //     y: 45,
          //     z: 0,
          //   },
          //   radiusSU: 0.1,
          //   hexColor: "#00c8ff",
          //   href: "https://tinyurl.com/",
          // },
        ],
      },
    ],
  };
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.end(JSON.stringify(mapData));
}
