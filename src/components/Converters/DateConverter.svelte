<script lang="ts">
  import { Input, Label } from "flowbite-svelte";
  import FormWrapper from "../FormWrapper.svelte";

  let dateString: string = new Date().toLocaleString();
  let unixTimeString: string = "";
  let iso8601String: string = "";

  function turnFromDateString(stringValue: string) {
    const newDateString: string = stringValue;
    const dateAsJsObject = new Date(newDateString);
    turnToUnixTime(dateAsJsObject);
    turnToIso8601(dateAsJsObject);
  }

  function turnFromDate(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    turnFromDateString(event.currentTarget.value);
  }

  function turnFromUnixTime(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const newUnixString: string = event.currentTarget.value;
    const dateAsJsObject = new Date(+newUnixString);
    turnToDate(dateAsJsObject);
    turnToIso8601(dateAsJsObject);
  }

  function turnFromIso8601(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const newIsoString: string = event.currentTarget.value;
    const dateAsJsObject = new Date(newIsoString);
    turnToDate(dateAsJsObject);
    turnToUnixTime(dateAsJsObject);
  }

  function turnToDate(date: Date) {
    dateString = date.toLocaleString();
  }

  function turnToUnixTime(date: Date) {
    unixTimeString = `${date.getTime()}`;
  }

  function turnToIso8601(date: Date) {
    iso8601String = date.toISOString();
  }

  turnFromDateString(dateString);
</script>

<FormWrapper>
  <div>
    <Label for="date" class="mb-2">Date</Label>
    <Input
      type="text"
      id="date"
      bind:value={dateString}
      on:input={turnFromDate}
    />
  </div>

  <div>
    <Label for="unix-time" class="mb-2">Unix Time</Label>
    <Input
      type="text"
      id="unix-time"
      bind:value={unixTimeString}
      on:input={turnFromUnixTime}
    />
  </div>

  <div>
    <Label for="iso-8601" class="mb-2">ISO 8601</Label>
    <Input
      type="text"
      id="iso-8601"
      bind:value={iso8601String}
      on:input={turnFromIso8601}
    />
  </div>
</FormWrapper>
