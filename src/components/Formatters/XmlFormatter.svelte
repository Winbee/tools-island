<script lang="ts">
  import { Select, Label, Textarea, Button } from "flowbite-svelte";
  import xmlFormat from "xml-formatter";
  import FormWrapper from "../FormWrapper.svelte";

  let input: string = `<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>`;
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
    if (indentation === "minified") {
      input = xmlFormat.minify(input, {
        filter: (node) => node.type !== "Comment",
        collapseContent: true,
      });
    } else {
      input = xmlFormat(input, { indentation });
    }
  }

  formatString();
</script>

<FormWrapper>
  <div>
    <Label>Document type</Label>
    <div class="flex gap-2">
      <Select items={indentationOptions} bind:value={indentation} />
      <Button on:click={formatString}>Format</Button>
    </div>
  </div>

  <div>
    <Label for="input" class="mb-2">Input</Label>
    <Textarea
      id="input"
      rows="4"
      bind:value={input}
      class="min-h-[calc((100vh-20rem)/2)]"
    />
  </div>
</FormWrapper>
