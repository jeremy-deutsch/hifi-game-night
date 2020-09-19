<script lang="ts" context="module">
  import type { PreloadContext } from "../../../otherSapperTypes";
  export async function preload(this: PreloadContext) {
    const res = await this.fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return { initialUrl: urls.game2Link };
  }
</script>

<script lang="ts">
  import EditGameUrl from "../../../components/EditGameURL.svelte";
  export let initialUrl: string | null;

  async function getGameLink() {
    if (!process.browser) return null;
    const res = await fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return urls.game2Link;
  }

  async function putGameLink(game2Link: string) {
    const res = await fetch("/jeremyparty/gameLinks", {
      method: "put",
      body: JSON.stringify({ game2Link }),
    });
    const json = await res.json();
    if (!json || json.game2Link === undefined) {
      throw new Error("Data came back weird");
    }
    if (json.game2Link !== game2Link) {
      throw new Error("Link rejected");
    }
    return json.game2Link;
  }
</script>

<svelte:head>
  <title>Edit game 2</title>
</svelte:head>

<EditGameUrl {getGameLink} {putGameLink} {initialUrl} />
