<script lang="ts">
  import { Fileupload, Helper, Label, Select, Textarea } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let inputFile: File;
  let output = "";
  let targetChecksum = "";
  $: isEmpty = !output || !targetChecksum;
  $: isEqual = output === targetChecksum;
  const hashAlgorithmOptions = [
    {
      name: "SHA-1",
      value: "SHA-1",
    },
    {
      name: "SHA-256",
      value: "SHA-256",
    },
    {
      name: "SHA-384",
      value: "SHA-384",
    },
    {
      name: "SHA-512",
      value: "SHA-512",
    },
  ];
  let hashAlgorithm = hashAlgorithmOptions[0].value;

  async function checkArrayBuffer(arrayBuffer: any) {
    try {
      const hash = await window.crypto.subtle.digest(
        hashAlgorithm,
        arrayBuffer
      );
      output = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (error) {
      output = "";
    }
  }
  function check() {
    if (!inputFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      checkArrayBuffer(arrayBuffer);
    };
    reader.readAsArrayBuffer(inputFile);
  }
  function handleFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    inputFile = file;
    check();
  }
</script>

<FormWrapper>
  <div>
    <Label for="type" class="mb-2">Hash Algorithm</Label>
    <div class="flex gap-2">
      <Select
        id="type"
        items={hashAlgorithmOptions}
        bind:value={hashAlgorithm}
        on:change={check}
      />
    </div>
  </div>

  <div>
    <Label for="file" class="pb-2">Upload file</Label>
    <Fileupload id="file" on:change={handleFileChange} />
  </div>

  <div>
    <Label for="output" class="mb-2">Computed checksum</Label>
    <Textarea
      id="output"
      rows="4"
      bind:value={output}
      readonly
      class="min-h-[calc((100vh-40rem)/2)] resize-y"
    />
  </div>

  <div>
    <Label for="targetChecksum" class="mb-2">Checksum to validate</Label>
    <Textarea
      id="targetChecksum"
      rows="4"
      bind:value={targetChecksum}
      color={isEmpty ? undefined : isEqual ? "green" : "red"}
      class="min-h-[calc((100vh-40rem)/2)] resize-y"
    />
    {#if !isEmpty}
      {#if isEqual}
        <Helper class="mt-2" color="green">
          <span class="font-medium">Checksum are equal.</span>
        </Helper>
      {:else}
        <Helper class="mt-2" color="red">
          <span class="font-medium">Checksum are different.</span>
        </Helper>
      {/if}
    {/if}
  </div>
</FormWrapper>
