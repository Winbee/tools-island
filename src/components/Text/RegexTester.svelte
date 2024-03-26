<script>
  import { Input, Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let regex = "t";
  let testString = "test";
  let computedRegex = new RegExp("");
  let invalidRegex = false;
  let regexTest = false;
  let regexExec = null;
  let stringMatch = null;
  let stringMatchAll = null;
  let stringSearch = null;
  let stringSplit = null;

  const runRegex = () => {
    try {
      invalidRegex = false;
      // We need to recreate the regex to have the correct index
      regexTest = new RegExp(regex, "g").test(testString);
      regexExec = new RegExp(regex, "g").exec(testString);
      computedRegex = new RegExp(regex, "g");
      stringMatch = testString.match(computedRegex);
      stringMatchAll = testString.matchAll(computedRegex);
      stringSearch = testString.search(computedRegex);
      stringSplit = testString.split(computedRegex);
    } catch (error) {
      invalidRegex = true;
      regexTest = false;
      regexExec = null;
    }
  };

  runRegex();
</script>

<FormWrapper>
  <div>
    <Label for="regex">Regex</Label>
    <Input
      type="text"
      id="regex"
      class="mt-2"
      bind:value={regex}
      on:input={runRegex}
    />
  </div>

  <div>
    <Label for="input" class="mb-2">Text</Label>
    <Textarea
      id="input"
      rows="4"
      bind:value={testString}
      on:input={runRegex}
      class="min-h-[calc((100vh-28rem)/2)] resize-y"
    />
  </div>

  <div>
    {#if invalidRegex === true}
      <span>Invalid regex</span>
    {:else}
      <div
        class="grid grid-cols-2 rounded-lg border border-solid border-gray-300 overflow-hidden"
      >
        <div class="bg-gray-50 p-1 font-medium">Method</div>
        <div class="bg-gray-50 p-1 font-medium">Result</div>
        <div class="p-1">String.match()</div>
        <div class="p-1">
          {JSON.stringify(stringMatch, null, " ")}
        </div>
        <div class="p-1">String.matchAll()</div>
        <div class="p-1">
          {stringMatchAll === null
            ? null
            : JSON.stringify([...stringMatchAll], null, " ")}
        </div>
        <div class="p-1">String.search()</div>
        <div class="p-1">
          {JSON.stringify(stringSearch, null, " ")}
        </div>
        <div class="p-1">String.split()</div>
        <div class="p-1">
          {JSON.stringify(stringSplit, null, " ")}
        </div>
        <div class="p-1">Regex.test()</div>
        <div class="p-1">{regexTest}</div>
        <div class="p-1">Regex.exec()</div>
        <div class="grid grid-cols-2">
          {#if regexExec === null}
            <div class="p-1">{regexExec}</div>
          {:else}
            <div class="bg-gray-50 p-1 font-medium">Property</div>
            <div class="bg-gray-50 p-1 font-medium">Value</div>
            <div class="p-1">"raw indexes"</div>
            <div class="p-1">
              <span>{JSON.stringify(regexExec)}</span>
            </div>
            <div class="p-1">groups</div>
            <div class="p-1">
              {JSON.stringify(regexExec.groups)}
            </div>
            <div class="p-1">index</div>
            <div class="p-1">
              {regexExec.index}
            </div>
            <div class="p-1">input</div>
            <div>
              {JSON.stringify(regexExec.input)}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</FormWrapper>
