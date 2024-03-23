<script lang="ts">
  import { Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let decodedUrl: string = 'https://test.com?param1={"prop":"abc"}';
  let encodedUrl: string = "";

  function turnToDecoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    decodedUrl = decodeURI(event.currentTarget.value);
  }

  function turnToEncodedString(stringValue: string) {
    encodedUrl = encodeURI(stringValue);
  }

  function turnToEncoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    turnToEncodedString(event.currentTarget.value);
  }

  turnToEncodedString(decodedUrl);
</script>

<FormWrapper>
  <div>
    <Label for="decoded" class="mb-2">Decoded</Label>
    <Textarea
      id="decoded"
      rows="4"
      on:input={turnToEncoded}
      bind:value={decodedUrl}
      class="min-h-[calc((100vh-20rem)/2)] resize-y"
    />
  </div>

  <div>
    <Label for="encoded" class="mb-2">Encoded</Label>
    <Textarea
      id="encoded"
      rows="4"
      on:input={turnToDecoded}
      bind:value={encodedUrl}
      class="min-h-[calc((100vh-20rem)/2)] resize-y"
    />
  </div>
</FormWrapper>
