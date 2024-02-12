<script lang="ts">
  import { Input, Label, NumberInput, Toggle } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let pretify: boolean = true;
  let decimalString: string = `1234`;
  let hexadecimalString: string = "";
  let octalString: string = "";
  let binaryString: string = "";

  function addSpacesToNumber(number: string, numberOfDigit: number) {
    // Regex to match every numberOfDigit digits with a positive lookahead to ensure there are more digits
    const regex = new RegExp(`([0-9a-z]{${numberOfDigit}})(?=[0-9a-z])`, "g");
    return number
      .split("")
      .reverse()
      .join("")
      .replace(regex, "$1 ")
      .split("")
      .reverse()
      .join("");
  }

  function updateFormat() {
    const decimalAsJsObject = Math.min(
      parseInt(decimalString.replace(/[^0-9]/g, "")),
      Number.MAX_SAFE_INTEGER
    );
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromDecimalString(stringValue: string) {
    const newDecimalString: string = stringValue;
    const decimalAsJsObject = Math.min(
      parseInt(newDecimalString),
      Number.MAX_SAFE_INTEGER
    );
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromDecimal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    decimalString = event.currentTarget.value;
    turnFromDecimalString(
      event.currentTarget.value.replace(/[^0-9]/g, "") || "0"
    );
  }

  function turnFromHexadecimal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    hexadecimalString = event.currentTarget.value;
    const newHexadecimalString: string =
      event.currentTarget.value.replace(/[^0-9a-f]/g, "") || "0";
    const decimalAsJsObject = Math.min(
      parseInt(newHexadecimalString, 16),
      Number.MAX_SAFE_INTEGER
    );
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromOctal(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    octalString = event.currentTarget.value;
    const newOctalString: string =
      event.currentTarget.value.replace(/[^0-9]/g, "") || "0";
    const decimalAsJsObject = Math.min(
      parseInt(newOctalString, 8),
      Number.MAX_SAFE_INTEGER
    );
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnFromBinary(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    binaryString = event.currentTarget.value;
    const newBinaryString: string =
      event.currentTarget.value.replace(/[^0-1]/g, "") || "0";
    const decimalAsJsObject = Math.min(
      parseInt(newBinaryString, 2),
      Number.MAX_SAFE_INTEGER
    );
    turnToDecimal(decimalAsJsObject);
    turnToHexadecimal(decimalAsJsObject);
    turnToOctal(decimalAsJsObject);
    turnToBinary(decimalAsJsObject);
  }

  function turnToDecimal(decimal: number) {
    decimalString = decimal.toString(10);
    if (pretify) {
      const intl = new Intl.NumberFormat();
      decimalString = intl.format(+decimalString);
    }
  }

  function turnToHexadecimal(decimal: number) {
    hexadecimalString = decimal.toString(16);
    if (pretify) {
      hexadecimalString = addSpacesToNumber(hexadecimalString, 4);
    }
  }

  function turnToOctal(decimal: number) {
    octalString = decimal.toString(8);
    if (pretify) {
      octalString = addSpacesToNumber(octalString, 3);
    }
  }

  function turnToBinary(decimal: number) {
    binaryString = decimal.toString(2);
    if (pretify) {
      binaryString = addSpacesToNumber(binaryString, 4);
    }
  }

  turnFromDecimalString(decimalString);
</script>

<FormWrapper>
  <div>
    <Toggle bind:checked={pretify} on:change={updateFormat}>Format</Toggle>
  </div>
  <div>
    <Label for="decimal" class="mb-2">Decimal</Label>
    <Input id="decimal" value={decimalString} on:input={turnFromDecimal} />
  </div>
  <div>
    <Label for="hexadecimal" class="mb-2">Hexadecimal</Label>
    <Input
      type="text"
      id="hexadecimal"
      value={hexadecimalString}
      on:input={turnFromHexadecimal}
    />
  </div>

  <div>
    <Label for="octal" class="mb-2">Octal</Label>
    <Input
      type="text"
      id="octal"
      value={octalString}
      on:input={turnFromOctal}
    />
  </div>

  <div>
    <Label for="binary" class="mb-2">Binary</Label>
    <Input
      type="text"
      id="binary"
      value={binaryString}
      on:input={turnFromBinary}
    />
  </div>
</FormWrapper>
