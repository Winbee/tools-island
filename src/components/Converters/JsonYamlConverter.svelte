<script lang="ts">
  import { Label, Textarea } from "flowbite-svelte";
  import { parse, stringify } from "yaml";
  import FormWrapper from "../FormWrapper.svelte";

  let jsonString: string = `{
    "members": [
        {
            "age": 16,
            "name": "Alice"
        },
        {
            "age": 24,
            "name": "Bob"
        }
    ],
    "type": "members"
}`;
  let yamlString: string = "";

  function turnToJson(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    const newYamlString: string = event.currentTarget.value;
    const yamlAsJsObject = parse(newYamlString);
    jsonString = JSON.stringify(yamlAsJsObject, null, 4);
  }

  function turnToYamlString(stringValue: string) {
    const newJsonString: string = stringValue;
    const jsonAsJsObject = JSON.parse(newJsonString);
    yamlString = stringify(jsonAsJsObject);
  }

  function turnToYaml(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    turnToYamlString(event.currentTarget.value);
  }

  turnToYamlString(jsonString);
</script>

<FormWrapper>
  <div>
    <Label for="json-format" class="mb-2">Json format</Label>
    <Textarea
      id="json-format"
      rows="4"
      on:input={turnToYaml}
      bind:value={jsonString}
      class="min-h-[calc((100vh-20rem)/2)] resize-y"
    />
  </div>
  <div>
    <Label for="yaml-format" class="mb-2">Yaml format</Label>
    <Textarea
      id="yaml-format"
      rows="4"
      on:input={turnToJson}
      bind:value={yamlString}
      class="min-h-[calc((100vh-20rem)/2)] resize-y"
    />
  </div>
</FormWrapper>
