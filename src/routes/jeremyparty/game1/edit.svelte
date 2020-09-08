<script lang="ts" context="module">
  import type { PreloadContext } from "../../../otherSapperTypes";
  export async function preload(this: PreloadContext) {
    const res = await this.fetch("jeremyparty/gameLinks");
    const urls = await res.json();

    return { initialUrl: urls.game1Link };
  }
</script>

<script lang="ts">
  export let initialUrl: string | null;
  let savedUrl = initialUrl;

  let inputVal = "";

  let putState:
    | { type: "success" }
    | { type: "failure"; message: string }
    | null = null;

  async function onClick() {
    try {
      const res = await fetch("/jeremyparty/gameLinks", {
        method: "put",
        body: JSON.stringify({ game1Link: inputVal }),
      });
      const json = await res.json();
      savedUrl = json.game1Link;
      putState = { type: "success" };
    } catch (e) {
      const message = e.message || "Edit unsuccessful.";
      putState = { type: "failure", message };
    }
  }
</script>

{#if !savedUrl}
  <p>No URL saved yet.</p>
{:else}
  <p>The saved URL is {savedUrl}.</p>
{/if}
<input bind:value={inputVal} placeholder="Paste the link here" />
<button on:click={onClick}>Change the link</button>
{#if putState && putState.type === 'success'}
  <p>Success!</p>
{:else if putState && putState.type === 'failure'}
  <p>Error: {putState.message}</p>
{/if}
