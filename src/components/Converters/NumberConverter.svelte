<script lang="ts">
  import { Input, Label } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let decimalString: string = `1234`;
  let hexadecimalString: string = "";
  let octalString: string = "";
  let binaryString: string = "";

  function turnFromDecimalString(stringValue: string) {
    const newDecimalString: string = stringValue;
    const decimalAsJsObject = parseInt(newDecimalString);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromDecimal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    turnFromDecimalString(event.currentTarget.value);
  }

  function turnFromHexadecimal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const newHexadecimalString: string = event.currentTarget.value;
    const decimalAsJsObject = parseInt(newHexadecimalString, 16);
    turnToDecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromOctal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const newOctalString: string = event.currentTarget.value;
    const decimalAsJsObject = parseInt(newOctalString, 8);
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromBinary(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const newBinaryString: string = event.currentTarget.value;
    const decimalAsJsObject = parseInt(newBinaryString, 2);
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
  }

  function turnToDecimal(decimal: number) {
    decimalString = decimal.toString(10);
  }

  function turnToHexadecimal(decimal: number) {
    hexadecimalString = decimal.toString(16);
  }

  function turnToOctal(decimal: number) {
    octalString = decimal.toString(8);
  }

  function turnToBinary(decimal: number) {
    binaryString = decimal.toString(2);
  }

  turnFromDecimalString(decimalString);
</script>

<FormWrapper>
  <div>
    <Label for="decimal" class="mb-2">Decimal</Label>
    <Input
      type="text"
      id="decimal"
      bind:value={decimalString}
      on:input={turnFromDecimal}
    />
  </div>
  <div>
    <Label for="hexadecimal" class="mb-2">Hexadecimal</Label>
    <Input
      type="text"
      id="hexadecimal"
      bind:value={hexadecimalString}
      on:input={turnFromHexadecimal}
    />
  </div>

  <div>
    <Label for="octal" class="mb-2">Octal</Label>
    <Input
      type="text"
      id="octal"
      bind:value={octalString}
      on:input={turnFromOctal}
    />
  </div>

  <div>
    <Label for="binary" class="mb-2">Binary</Label>
    <Input
      type="text"
      id="binary"
      bind:value={binaryString}
      on:input={turnFromBinary}
    />
  </div>
</FormWrapper>
