<script lang="ts">
  import { Select, Label, Textarea, Button } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let input: string = '{ "Hello": "World" }';
  const indentationOptions = [
    {
      name: "2 Spaces",
      value: "  ",
    },
    {
      name: "4 Spaces",
      value: "    ",
    },
    {
      name: "1 Tab",
      value: "	",
    },
    {
      name: "Minified",
      value: "minified",
    },
  ];
  let indentation = indentationOptions[0].value;

  function formatString() {
    const jsonObject = JSON.parse(input);
    const indentationToApply = indentation === "minified" ? "" : indentation;
    input = JSON.stringify(jsonObject, null, indentationToApply);
  }

  formatString();
</script>

<FormWrapper>
  <div>
    <Label for="indentation" class="mb-2">Indentation</Label>
    <div class="flex gap-2">
      <Select
        id="indentation"
        items={indentationOptions}
        bind:value={indentation}
      />
      <Button on:click={formatString}>Format</Button>
    </div>
  </div>

  <div>
    <Label for="input" class="mb-2">Input</Label>
    <Textarea id="input" rows="4" bind:value={input} />
  </div>
</FormWrapper>
