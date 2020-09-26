<script lang="ts" context="module">
  import type { PreloadContext, PreloadPage } from "../../../otherSapperTypes";
  export async function preload(this: PreloadContext, page: PreloadPage) {
    const partyId = page.params.partyId;
    const res = await this.fetch(`${partyId}/gameLinks`);
    const urls = await res.json();

    return { initialUrl: urls.game1Link, partyId };
  }
</script>

<script lang="ts">
  import EditGameUrl from "../../../components/EditGameURL.svelte";
  export let initialUrl: string | null;
  export let partyId: string;

  async function getGameLink() {
    if (!process.browser) return null;
    const res = await fetch(`/${partyId}/gameLinks`);
    const urls = await res.json();

    return urls.game1Link;
  }

  async function putGameLink(game1Link: string) {
    const res = await fetch(`/${partyId}/gameLinks`, {
      method: "put",
      body: JSON.stringify({ game1Link }),
    });
    const json = await res.json();
    if (!json || json.game1Link === undefined) {
      throw new Error("Data came back weird");
    }
    if (json.game1Link !== game1Link) {
      throw new Error(
        "Link rejected. The link has to be from one of the pages under Games You Can Play"
      );
    }
    return json.game1Link;
  }
</script>

<svelte:head>
  <title>Edit game 1</title>
</svelte:head>

<EditGameUrl {getGameLink} {putGameLink} {initialUrl} />
