<script lang="ts" context="module">
  import type { PreloadContext } from "../../../otherSapperTypes";
  export async function preload(this: PreloadContext) {
    const res = await this.fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return { initialUrl: urls.game1Link };
  }
</script>

<script lang="ts">
  import EditGameUrl from "../../../components/EditGameURL.svelte";
  export let initialUrl: string | null;

  async function putGameLink(game1Link: string) {
    const res = await fetch("/jeremyparty/gameLinks", {
      method: "put",
      body: JSON.stringify({ game1Link }),
    });
    const json = await res.json();
    if (!json || json.game1Link === undefined) {
      throw new Error("Data came back weird");
    }
    return json.game1Link;
  }
</script>

<EditGameUrl {putGameLink} {initialUrl} />
