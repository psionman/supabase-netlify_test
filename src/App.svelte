<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'

  onMount(() => {
    // getData()
  })

  let dataPromiseA = getData()
  console.log(dataPromiseA);
  let dataPromise = [
    {
        "id": 1,
        "created_at": "2025-04-09T11:21:02.966748+00:00",
        "first_name": "X",
        "last_name": "Y",
        "username": "Z",
        "tester": true,
        "contacts": [
            "A",
            "B"
        ]
    }
]

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
  <h1>Supabase test</h1>
  {#await dataPromise then data}
    {#each Object.entries(data) as [key, value]}
      {key} {value.first_name}<br>
    {/each}
  {/await}
</main>

<style>
</style>
