<script lang="ts">
  import Collapsible from "./Collapsible.svelte";

  export let initialUrl: string | null;
  export let putGameLink: (link: string) => Promise<string>;

  let savedUrl = initialUrl;

  export let getGameLink: () => Promise<string | null>;
  let refetchTimeout: NodeJS.Timeout;
  function resetRefetchInterval() {
    // we use fetch(), so only run this on the client
    if (!process.browser) return;
    const newTimeout = setInterval(async () => {
      if (refetchTimeout !== newTimeout) return;
      const gameLink = await getGameLink();
      if (refetchTimeout !== newTimeout) return;
      savedUrl = gameLink;
    }, 10000);
    clearTimeout(refetchTimeout);
    refetchTimeout = newTimeout;
  }

  let inputVal = "";

  let putState:
    | { type: "success" }
    | { type: "failure"; message: string }
    | null = null;

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!inputVal) return;
    try {
      let valueToSubmit = inputVal;
      if (
        valueToSubmit &&
        typeof valueToSubmit === "string" &&
        !valueToSubmit.startsWith("https://") &&
        !valueToSubmit.startsWith("http://") &&
        !valueToSubmit.startsWith("localhost:")
      ) {
        valueToSubmit = "https://" + valueToSubmit;
      }
      savedUrl = await putGameLink(valueToSubmit);
      putState = { type: "success" };
      resetRefetchInterval();
    } catch (e) {
      const message = e.message || "Edit unsuccessful.";
      putState = { type: "failure", message };
    }
  }
</script>

<style>
  .container {
    display: flex;
    margin: 0;
    justify-content: center;
    padding: 0 8%;
  }

  .section {
    display: flex;
    flex: 1;
  }

  .section.left {
    justify-content: flex-end;
  }

  .section.right {
    justify-content: flex-start;
  }

  hr {
    margin: 0px 30px;
  }

  ul {
    margin: 0;
  }

  li {
    padding: 2px 0px;
  }
</style>

<div class="container">
  <div class="section left">
    <div>
      <h1>Edit the link to a game or room</h1>
      <h3>
        The link on the map next to this one will redirect to the link saved
        here.
      </h3>
      {#if !savedUrl}
        <p>No URL saved yet for this link.</p>
      {:else}
        <p>
          The currently saved URL is <a
            href={savedUrl}
            target="_blank">{savedUrl}</a>.
        </p>
      {/if}
      <form on:submit={onSubmit}>
        <input
          bind:value={inputVal}
          maxlength={200}
          placeholder="Paste the link here" />
        <button disabled={!inputVal}>Save the new link</button>
      </form>
      <p>
        {#if putState && putState.type === 'success'}
          Success!
        {:else if putState && putState.type === 'failure'}
          Error: {putState.message}
        {/if}
      </p>
    </div>
  </div>
  <hr />
  <div class="section right">
    <div>
      <h1>Games you can play</h1>
      <Collapsible title="Browser games">
        <ul>
          <li><a target="_blank" href="https://skribbl.io">skribbl.io</a></li>
          <li>
            <a target="_blank" href="https://codenames.game">Codenames</a>
          </li>
        </ul>
      </Collapsible>
      <Collapsible title="Talking games">
        <ul>
          <li><a target="_blank" href="https://skribbl.io">skribbl.io</a></li>
          <li>
            <a target="_blank" href="https://codenames.game">Codenames</a>
          </li>
        </ul>
      </Collapsible>
    </div>
  </div>
</div>
