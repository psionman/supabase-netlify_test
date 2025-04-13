<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'

  onMount(() => {
    getData()
  })

  let dataPromise = getData()

async function getData() {
  const { data } = await supabase
  .from('users')
  .select()
  .overrideTypes<Array<{ id: string }>, { merge: false }>()

  console.log(data);
  return data;
}
</script>

<main>
  <h1>Jeff's test</h1>
  {#await dataPromise then data}
    {#each Object.entries(data) as [key, value]}
      {key} {value.first_name}<br>
    {/each}
  {/await}
</main>

<style>
</style>
