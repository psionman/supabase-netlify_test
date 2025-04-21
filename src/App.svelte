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

<script lang='ts'>
    import { supabase } from './supabaseClient';
    let dataPromise = getData();
    let username = '';
    let first_name = '';
    let last_name = '';

    async function getData() {
        const { data } = await supabase
        .from('users')
        .select()
        .overrideTypes<Array<{ id: string }>, { merge: false }>()
        return data;
    }

    async function addRecord() {
    const record = {
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
    }
        const { data, error } = await supabase
        .from('users')
        .insert(record)
        .select(); // optional — returns the updated row(s)
        if (error) {
          console.error('Error:', error);
        } else {
          console.log('addRecord:', record);
        }
        username = ''
        first_name = ''
        last_name = ''
        // return data;
    }

// Reference to store our subscription
let messageSubscription = null;

const setupRealtime = async () => {
  messageSubscription = supabase
    .channel('public:users')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users'
      },
      (payload) => handleEvent(payload) // function to handle change event
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Realtime connection established');
      }
      if (status === 'CHANNEL_ERROR') {
        console.error('Connection error');
      }
      if (status === 'TIMED_OUT') {
        console.warn('Connection timeout');
      }
    });

  // Return cleanup function
  return () => {
    if (messageSubscription) {
      supabase.removeChannel(messageSubscription);
    }
  };
};

// Execute setup and get cleanup function
// const cleanup = await setupRealtime();
setupRealtime()
// Later in application lifecycle
// cleanup();

function handleEvent(payload) {
  console.log(payload);
  dataPromise = getData();
}

</script>

<style>
</style>
