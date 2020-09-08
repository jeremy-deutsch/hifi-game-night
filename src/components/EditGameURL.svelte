<script lang="ts">
  export let initialUrl: string | null;
  export let putGameLink: (link: string) => Promise<string>;

  let savedUrl = initialUrl;

  let inputVal = "";

  let putState:
    | { type: "success" }
    | { type: "failure"; message: string }
    | null = null;

  async function onClick() {
    try {
      savedUrl = await putGameLink(inputVal);
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
