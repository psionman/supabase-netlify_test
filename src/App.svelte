<main>
    <h1>Supabase tested</h1>
    <input type="text" placeholder="Username" bind:value={username}>
    <input type="text" placeholder="First name" bind:value={first_name}>
    <input type="text" placeholder="Last name" bind:value={last_name}>
    <button id="database-button" on:click={addRecord}>
        Add
    </button>
    <p></p>
    {#await dataPromise then data}
        {#each Object.entries(data) as [key, item]}
            {item.first_name} {item.last_name} {item.username}<br>
        {/each}
    {/await}
</main>

<script lang="ts">
    import { supabase } from './supabaseClient'
    let dataPromise = getData()
    let username = ''
    let first_name = ''
    let last_name = ''

    async function getData() {
        const { data } = await supabase
        .from('users')
        .select()
        .overrideTypes<Array<{ id: string }>, { merge: false }>()
        console.log(data);
        return data;
    }

    async function addRecord() {
        console.log('add', username);
        const { data, error } = await supabase
        .from('users')
        .insert(
          {
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
          }
        )
        // .eq('username', username)
        .select(); // optional — returns the updated row(s)
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('Record:', data);
        }
        username = ''
        first_name = ''
        last_name = ''
        getData()
        return data;
    }
</script>

<style>
</style>
