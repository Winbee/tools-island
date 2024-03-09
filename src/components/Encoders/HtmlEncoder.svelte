<script lang="ts">
  import { Label, Textarea } from "flowbite-svelte";
  import he from "he";
  import FormWrapper from "../FormWrapper.svelte";

  let decodedHtml: string = '<script>alert("abc")</script';
  let encodedHtml: string = "";

  function turnToDecoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    decodedHtml = he.decode(event.currentTarget.value);
  }

  function turnToEncodedString(stringValue: string) {
    encodedHtml = he.encode(stringValue);
  }

  function turnToEncoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    turnToEncodedString(event.currentTarget.value);
  }

  turnToEncodedString(decodedHtml);
</script>

<FormWrapper>
  <div>
    <Label for="decoded" class="mb-2">Decoded</Label>
    <Textarea
      id="decoded"
      rows="4"
      on:input={turnToEncoded}
      bind:value={decodedHtml}
      class="min-h-[calc((100vh-20rem)/2)]"
    />
  </div>

  <div>
    <Label for="encoded" class="mb-2">Encoded</Label>
    <Textarea
      id="encoded"
      rows="4"
      on:input={turnToDecoded}
      bind:value={encodedHtml}
      class="min-h-[calc((100vh-20rem)/2)]"
    />
  </div>
</FormWrapper>
