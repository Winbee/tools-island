<script lang="ts">
  import { Select, Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let input: string = `Hello world`;
  let transformOptions = [
    {
      name: "Sentence case",
      value: "sentenceCase",
    },
    {
      name: "lower case",
      value: "lowerCase",
    },
    {
      name: "UPPER CASE",
      value: "upperCase",
    },
    {
      name: "camelCase",
      value: "camelCase",
    },
    {
      name: "Pascal Case",
      value: "pascalCase",
    },
    {
      name: "snake_case",
      value: "snakeCase",
    },
    {
      name: "CONSTANT_CASE",
      value: "constantCase",
    },
    {
      name: "kebab-case",
      value: "kebabCase",
    },
  ];
  let selectedTransform = transformOptions[0].value;
  let output: string;
  $: output = transform(input, selectedTransform);

  function splitBySpace(inputString: string) {
    return inputString.split(" ");
  }

  function capitalizeFirstLetter(word: string) {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return "";
    }
  }

  function transform(
    inputString: string,
    selectedTransform: (typeof transformOptions)[number]["value"]
  ): string {
    switch (selectedTransform) {
      case "sentenceCase":
        return toSentenceCase(inputString);
      case "lowerCase":
        return toLowerCase(inputString);
      case "upperCase":
        return toUpperCase(inputString);
      case "camelCase":
        return toCamelCase(inputString);
      case "pascalCase":
        return toPascalCase(inputString);
      case "snakeCase":
        return toSnakeCase(inputString);
      case "constantCase":
        return toConstantCase(inputString);
      case "kebabCase":
        return toKebabCase(inputString);
      default: {
        throw new Error("Unknown transform type");
      }
    }
  }

  function toSentenceCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      if (index === 0) {
        return capitalizeFirstLetter(word);
      }
      return word.toLowerCase();
    });
    return transformedWords.join(" ");
  }

  function toLowerCase(inputString: string): string {
    return inputString.toLowerCase();
  }

  function toUpperCase(inputString: string): string {
    return inputString.toUpperCase();
  }

  function toCamelCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      if (index == 0) {
        return word.toLowerCase();
      }
      return capitalizeFirstLetter(word);
    });
    return transformedWords.join(" ");
  }

  function toPascalCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      return capitalizeFirstLetter(word);
    });
    return transformedWords.join(" ");
  }

  function toSnakeCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      return word.toLowerCase();
    });
    return transformedWords.join("_");
  }

  function toConstantCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      return word.toUpperCase();
    });
    return transformedWords.join("_");
  }

  function toKebabCase(inputString: string): string {
    const words = splitBySpace(inputString);
    const transformedWords = words.map((word, index) => {
      return word.toLowerCase();
    });
    return transformedWords.join("-");
  }
</script>

<FormWrapper>
  <div>
    <Label for="conversion-type">Conversion type</Label>
    <Select
      id="conversion-type"
      class="mt-2"
      items={transformOptions}
      bind:value={selectedTransform}
    />
  </div>

  <div>
    <Label for="input" class="mb-2">Input</Label>
    <Textarea id="input" rows="4" bind:value={input} />
  </div>

  <div>
    <Label for="output" class="mb-2">Outpi</Label>
    <Textarea id="output" rows="4" bind:value={output} />
  </div>
</FormWrapper>
