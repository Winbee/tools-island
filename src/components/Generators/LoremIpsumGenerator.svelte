<script lang="ts">
  import { Label, NumberInput, Select, Textarea } from "flowbite-svelte";
  import { LoremIpsum } from "lorem-ipsum";
  import FormWrapper from "../FormWrapper.svelte";

  let length = 4;
  const generationTypeOptions = [
    {
      name: "Words",
      value: "words",
    },
    {
      name: "Sentences",
      value: "sentences",
    },
    {
      name: "Paragraphs",
      value: "paragraphs",
    },
  ];
  let generationType = generationTypeOptions[0].value;
  let output = "";

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  function generate() {
    switch (generationType) {
      case "words": {
        output = lorem.generateWords(length);
        break;
      }
      case "sentences": {
        output = lorem.generateSentences(length);
        break;
      }
      case "paragraphs": {
        output = lorem.generateParagraphs(length);
        break;
      }
    }
  }

  generate();
</script>

<FormWrapper>
  <div>
    <Label for="type" class="mb-2">Generation type</Label>
    <div class="flex gap-2">
      <Select
        id="type"
        items={generationTypeOptions}
        bind:value={generationType}
        on:change={generate}
      />
    </div>
  </div>

  <div>
    <Label for="length" class="mb-2">Length</Label>
    <NumberInput bind:value={length} on:change={generate} min={1} />
  </div>

  <div>
    <Label for="output" class="mb-2">Output</Label>
    <Textarea
      id="output"
      rows="4"
      bind:value={output}
      class="min-h-[calc((100vh-20rem)/2)]"
    />
  </div>
</FormWrapper>
