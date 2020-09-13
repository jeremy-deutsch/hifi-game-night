<script lang="ts">
  export let title: string;
  let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding-bottom: 4px;
  }

  .arrow {
    position: absolute;
  }

  .arrow.closed {
    font-size: 22px;
  }

  .arrow.expanded {
    font-size: 12px;
    padding-left: 4px;
  }

  .button-text {
    font-size: 20px;
    padding-left: 20px;
  }
</style>

<div>
  <button on:click={toggleExpanded}>
    {#if expanded}
      <span class="arrow expanded">&#9660;</span>
    {:else}<span class="arrow closed">&#9656;</span>{/if}
    <span class="button-text">{title}</span>
  </button>
  {#if expanded}
    <slot />
  {/if}
</div>
