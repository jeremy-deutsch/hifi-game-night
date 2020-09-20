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
      try {
        const gameLink = await getGameLink();
        if (refetchTimeout !== newTimeout) return;
        savedUrl = gameLink;
      } catch (e) {
        console.error(e);
      }
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

  .talking-games-section {
    padding-left: 14px;
  }

  .talking-games-rules {
    padding-left: 32px;
    margin: unset;
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
            target="_blank"
            rel="noreferrer noopener">{savedUrl}</a>.
        </p>
      {/if}
      <form on:submit={onSubmit}>
        <input
          bind:value={inputVal}
          maxlength={200}
          placeholder="Paste the new link here" />
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
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://skribbl.io">skribbl.io</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://codenames.game">Codenames</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://secrethitler.io">Secret Hitler</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://scattergoriesonline.net">Scattergories</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.wordscatter.com">Word Scatter (it's Boggle)</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://playingcards.io/">playingcards.io</a> (various card games,
            inc. Joking Hazard, and Funemployed if you ask Jeremy to set it up)
          </li>
        </ul>
      </Collapsible>
      <Collapsible title="Talking games">
        <div class="talking-games-section">
          <Collapsible title="Never Have I Ever">
            <p class="talking-games-rules">
              It's the Never Have I ever you know from "real life"! Go around in
              a circle saying things you haven't done, and speak up when you
              hear someone mention something you've done. You can count on your
              fingers for extra effect if you really want.
            </p>
          </Collapsible>
          <Collapsible title="Oops, All Truths!">
            <p class="talking-games-rules">
              Remember Truth Or Dare? Dares are hard over voice chat... so
              tonight we're going all truths. Each player to answer a truth gets
              to ask the next one.
            </p>
          </Collapsible>
          <Collapsible title={'Work Zoom "Happy Hour" Simulator'}>
            <p class="talking-games-rules">
              This is the game you don't want to play: trying to awkwardly have
              a conversation with six people at once. Instead, try talking to
              people one-on-one or in small groups!
            </p>
          </Collapsible>
        </div>
      </Collapsible>
    </div>
  </div>
</div>
