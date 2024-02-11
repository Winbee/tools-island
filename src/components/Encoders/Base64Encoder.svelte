<script lang="ts">
  import { Label, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let decodedBase64: string = "a Ā 𐀀 文 🦄";
  let encodedBase64: string = "";

  function base64ToBytes(base64: string) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) ?? 0);
  }

  function bytesToBase64(bytes: Uint8Array): string {
    const binString = Array.from(bytes, (x: number) =>
      String.fromCodePoint(x)
    ).join("");
    return btoa(binString);
  }

  function turnToDecoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    const bytes = base64ToBytes(event.currentTarget.value);
    const textDecoder = new TextDecoder();
    decodedBase64 = textDecoder.decode(bytes);
  }

  function turnToEncodedString(stringValue: string) {
    const textEncoder = new TextEncoder();
    const bytes = textEncoder.encode(stringValue);
    encodedBase64 = bytesToBase64(bytes);
  }

  function turnToEncoded(
    event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }
  ) {
    turnToEncodedString(event.currentTarget.value);
  }

  turnToEncodedString(decodedBase64);
</script>

<FormWrapper>
  <div>
    <Label for="decoded" class="mb-2">Decoded</Label>
    <Textarea
      id="decoded"
      rows="4"
      on:input={turnToEncoded}
      bind:value={decodedBase64}
    />
  </div>

  <div>
    <Label for="encoded" class="mb-2">Encoded</Label>
    <Textarea
      id="encoded"
      rows="4"
      on:input={turnToDecoded}
      bind:value={encodedBase64}
    />
  </div>
</FormWrapper>
