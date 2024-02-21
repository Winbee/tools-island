<script lang="ts">
  import ColorPicker, {
    A11yVariant,
    type RgbaColor,
    type HsvaColor,
  } from "svelte-awesome-color-picker";
  import FormWrapper from "../FormWrapper.svelte";
  import { Label, Input } from "flowbite-svelte";

  let hex1: string = "#000000";
  let hex2: string = "#ffffff";
</script>

<FormWrapper>
  <div>
    <Label for="input" class="mb-2 flex gap-2 items-center"
      ><input type="color" bind:value={hex1} />
      <div>Primary color</div>
    </Label>

    <div class="my-color-picker-wrapper">
      <ColorPicker
        bind:hex={hex1}
        components={A11yVariant}
        isDialog={false}
        a11yLevel="AAA"
        a11yColors={[{ bgHex: hex2, placeholder: "title", size: "large" }]}
      />
    </div>
  </div>

  <div>
    <Label for="input" class="mb-2 flex gap-2 items-center"
      ><input type="color" bind:value={hex2} />
      <div>Secondary color</div>
    </Label>
    <div class="my-color-picker-wrapper">
      <ColorPicker
        bind:hex={hex2}
        components={A11yVariant}
        isDialog={false}
        a11yLevel="AAA"
        a11yColors={[{ bgHex: hex1, placeholder: "title", size: "large" }]}
      />
    </div>
  </div>
</FormWrapper>

<style>
  .my-color-picker-wrapper {
    --cp-bg-color: var(--sl-color-bg);
    --cp-border-color: var(--sl-color-text);
    --cp-input-color: var(--sl-color-bg-inline-code);
    --cp-button-hover-color: var(--sl-color-bg-inline-code);
    --focus-color: var(--sl-color-accent);
    --slider-width: 15px;
    --picker-indicator-size: 10px;
  }
</style>
