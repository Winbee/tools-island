<script lang="ts">
  import { Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let decodedUrl: string = 'https://test.com?param1={"prop":"abc"}';
  let componentEncodedUrl: string = "";
  let encodedUrl: string = "";

  function turnFromEncoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    decodedUrl = decodeURI(event.currentTarget.value);
    turnToComponentEncoded(decodedUrl);
  }

  function turnFromComponentEncoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    decodedUrl = decodeURIComponent(event.currentTarget.value);
    turnToEncoded(decodedUrl);
  }

  function turnFromDecoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    turnToEncoded(event.currentTarget.value);
    turnToComponentEncoded(event.currentTarget.value);
  }

  function turnToEncoded(stringValue: string) {
    encodedUrl = encodeURI(stringValue);
  }

  function turnToComponentEncoded(stringValue: string) {
    componentEncodedUrl = encodeURIComponent(stringValue);
  }

  turnToEncoded(decodedUrl);
  turnToComponentEncoded(decodedUrl);
</script>

<FormWrapper>
  <div>
    <Label for="decoded" class="mb-2">Decoded</Label>
    <Textarea
      id="decoded"
      rows="4"
      on:input={turnFromDecoded}
      bind:value={decodedUrl}
      class="min-h-[calc((100vh-25rem)/3)] resize-y"
    />
  </div>

  <div>
    <Label for="component-encoded" class="mb-2">Component encoded</Label>
    <Textarea
      id="component-encoded"
      rows="4"
      on:input={turnFromComponentEncoded}
      bind:value={componentEncodedUrl}
      class="min-h-[calc((100vh-25rem)/3)] resize-y"
    />
  </div>

  <div>
    <Label for="encoded" class="mb-2">Encoded</Label>
    <Textarea
      id="encoded"
      rows="4"
      on:input={turnFromEncoded}
      bind:value={encodedUrl}
      class="min-h-[calc((100vh-25rem)/3)] resize-y"
    />
  </div>
</FormWrapper>
