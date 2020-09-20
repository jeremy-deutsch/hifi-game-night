<script lang="ts" context="module">
  import type { PreloadContext } from "../../../otherSapperTypes";
  export async function preload(this: PreloadContext) {
    const res = await this.fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return { initialUrl: urls.game3Link };
  }
</script>

<script lang="ts">
  import EditGameUrl from "../../../components/EditGameURL.svelte";
  export let initialUrl: string | null;

  async function getGameLink() {
    if (!process.browser) return null;
    const res = await fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return urls.game3Link;
  }

  async function putGameLink(game3Link: string) {
    const res = await fetch("/jeremyparty/gameLinks", {
      method: "put",
      body: JSON.stringify({ game3Link }),
    });
    const json = await res.json();
    if (!json || json.game3Link === undefined) {
      throw new Error("Data came back weird");
    }
    if (json.game3Link !== game3Link) {
      throw new Error(
        "Link rejected. The link has to be from one of the pages under Games You Can Play"
      );
    }
    return json.game3Link;
  }
</script>

<svelte:head>
  <title>Edit game 3</title>
</svelte:head>

<EditGameUrl {getGameLink} {putGameLink} {initialUrl} />
