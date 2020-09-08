<script lang="ts">
  let inputVal = "";

  async function onClick() {
    const res = await fetch("/jeremyparty/gameLinks", {
      method: "put",
      body: JSON.stringify({ game1Link: inputVal }),
    });
    const json = await res.json();
  }
</script>

<input bind:value={inputVal} placeholder="Paste the link here" />
<button on:click={onClick}>Change the link</button>
