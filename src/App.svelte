<script lang="ts">
    import { supabase } from './supabaseClient'
    let dataPromise = getData()

    async function getData() {
        const { data } = await supabase
        .from('users')
        .select()
        .overrideTypes<Array<{ id: string }>, { merge: false }>()
        return data;
    }
</script>

<main>
    <h1>Supabase testing</h1>
    {#await dataPromise then data}
        {#each Object.entries(data) as [key, item]}
            {item.first_name} {item.last_name} {item.username}<br>
        {/each}
    {/await}
</main>

<style>
</style>
