<script>
  import { Input, Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";
  import { escapeRegExp } from "lodash-es";

  let regex = "t";
  let testString = "test";
  let computedRegex = new RegExp("");
  let splittedString = [];

  const highlightMatches = () => {
    try {
      computedRegex = new RegExp(`(${escapeRegExp(regex)})`, "g");
      splittedString = testString.split(computedRegex) || [];
      console.log(splittedString);
    } catch (error) {
      console.error("Invalid regex:", error);
      splittedString = [];
    }
  };

  highlightMatches();
</script>

<FormWrapper>
  <div>
    <Label for="regex">Regex</Label>
    <Input
      type="text"
      id="regex"
      class="mt-2"
      bind:value={regex}
      on:input={highlightMatches}
    />
  </div>

  <div>
    <Label for="input" class="mb-2">Text</Label>
    <Textarea
      id="input"
      rows="4"
      bind:value={testString}
      on:input={highlightMatches}
      class="min-h-[calc((100vh-28rem)/2)] resize-y"
    />
  </div>

  <div>
    <Label>Highlights</Label>
    {#if regex && splittedString.length > 0}
      {#each splittedString as oneSplit}
        {#if computedRegex.test(oneSplit)}
          <span class="highlight">{oneSplit}</span>
        {:else}
          <span>{oneSplit}</span>
        {/if}
      {/each}
    {:else}
      <span>{testString}</span>
    {/if}
  </div>
</FormWrapper>

<style>
  .highlight {
    background-color: yellow;
  }
</style>
