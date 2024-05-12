<script lang="ts">
  import { Select, Label, Textarea, Button } from "flowbite-svelte";
  import {
    formatDialect,
    sql,
    bigquery,
    db2,
    db2i,
    hive,
    mariadb,
    mysql,
    tidb,
    n1ql,
    plsql,
    postgresql,
    redshift,
    singlestoredb,
    snowflake,
    spark,
    sqlite,
    transactsql,
    trino,
  } from "sql-formatter";
  import FormWrapper from "../FormWrapper.svelte";

  let input: string = `select supplier_name,city from
(select * from suppliers join addresses on suppliers.address_id=addresses.id)
as suppliers
where supplier_id>500
order by supplier_name asc,city desc;`;
  const languageOptions = [
    {
      name: "sql",
      value: sql,
    },
    {
      name: "bigquery",
      value: bigquery,
    },
    {
      name: "db2",
      value: db2,
    },
    {
      name: "db2i",
      value: db2i,
    },
    {
      name: "hive",
      value: hive,
    },
    {
      name: "mariadb",
      value: mariadb,
    },
    {
      name: "mysql",
      value: mysql,
    },
    {
      name: "tidb",
      value: tidb,
    },
    {
      name: "n1ql",
      value: n1ql,
    },
    {
      name: "plsql",
      value: plsql,
    },
    {
      name: "postgresql",
      value: postgresql,
    },
    {
      name: "redshift",
      value: redshift,
    },
    {
      name: "singlestoredb",
      value: singlestoredb,
    },
    {
      name: "snowflake",
      value: snowflake,
    },
    {
      name: "spark",
      value: spark,
    },
    {
      name: "sqlite",
      value: sqlite,
    },
    {
      name: "transactsql",
      value: transactsql,
    },
    {
      name: "trino",
      value: trino,
    },
  ];
  let language = languageOptions[0].value;

  function formatString() {
    input = formatDialect(input, { dialect: language });
  }

  formatString();
</script>

<FormWrapper>
  <div>
    <Label>Document type</Label>
    <div class="flex gap-2">
      <Select items={languageOptions} bind:value={language} />
      <Button on:click={formatString}>Format</Button>
    </div>
  </div>

  <div>
    <Label for="input" class="mb-2">Input</Label>
    <Textarea
      id="input"
      rows="4"
      bind:value={input}
      class="min-h-[calc((100vh-20rem)/2)] resize-y"
    />
  </div>
</FormWrapper>
