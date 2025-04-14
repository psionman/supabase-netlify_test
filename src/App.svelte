<script lang="ts">
  import { onMount } from 'svelte'
  import { supabase } from './supabaseClient'

  onMount(() => {
    // getData()
  })

  // let dataPromise = getData()
  // console.log(dataPromise);
  let dataPromise = [
    {
        "id": 1,
        "created_at": "2025-04-09T11:21:02.966748+00:00",
        "first_name": "Jeff",
        "last_name": "Watkins",
        "username": "jeff",
        "tester": true,
        "contacts": [
            "chrisb",
            "BloodAxe"
        ]
    },
    {
        "id": 2,
        "created_at": "2025-04-09T11:22:04.258322+00:00",
        "first_name": "Chris",
        "last_name": "Berry",
        "username": "chrisb",
        "tester": false,
        "contacts": [
            "jeff"
        ]
    },
    {
        "id": 3,
        "created_at": "2025-04-12T09:53:19.82186+00:00",
        "first_name": "Fred",
        "last_name": "Bloggs",
        "username": "fred",
        "tester": null,
        "contacts": null
    },
    {
        "id": 4,
        "created_at": "2025-04-13T10:00:48.079447+00:00",
        "first_name": "Fred",
        "last_name": "Bloggs",
        "username": "fred",
        "tester": null,
        "contacts": null
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
  <h1>Jeff's test</h1>
  {#await dataPromise then data}
    {#each Object.entries(data) as [key, value]}
      {key} {value.first_name}<br>
    {/each}
  {/await}
</main>

<style>
</style>
