<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    export let data: any;

    console.log(data.securityQuestionsList)
</script>

<head>
    <title>Vendor Registration</title>
</head>

<h1>Create your vendor account</h1>

<!-- result of submitting form, single place for displaying errors and results -->
{#if form?.registrationSuccess}
    <h2 id="registered">Congratulations, you are now a vendor.</h2>
{/if}
{#if form?.missing}
    <h2 id="error">Some fields have not been filled.</h2>
{/if}
{#if form?.passwordError}
    <h2 id="error">Password must be between 8 and 32 characters long.</h2>
{/if}

{#if form?.usernameExists}
    <h2 id="error">Username is already registered. Please choose a different one.</h2>
{/if}

{#if form?.phoneNumberExists}
    <h2 id="error">Phone number is already registered. Please choose a different one.</h2>
{/if}

{#if form?.phoneError}
    <h2 id="error">Phone number must have format 0XXXXXXXXXX.</h2>
{/if}

<div>
    <form method="post" action="?/registerVendor" id="vendorRegistration">
        <label class="label" for="username">Username</label>
        <input  class="input"
                name="username"
                id="username"
                type="text"
                required/>

        <label class="label" for="password">Password</label>
        <input  class="input" 
                name="password"
                id="password"
                type="password"
                required/>

        <label class="label" for="phone_number">Phone Number</label>
        <!-- requires format 0XXXXXXXXXX -->
        <input  class="input"
                name="phone_number"
                id="phone_number"
                type="tel"
                placeholder="0XXXXXXXXXX"
                title="0XXXXXXXXXX"
                required/>

        <label class="label" for="security_q">Security Question</label>
        <!-- no fixed security questions, let user type their own -->
        {#if data.securityQuestionsList.length == 0}
            <input  class="input"
                    name="security_q"
                    id="security_q"
                    type="text"
                    required/>
        
        <!-- display each security question in list -->
        {:else}
            <select class="select" name="security_q" form="vendorRegistration" required>
                {#each data.securityQuestionsList as securityQuestion}
                    <option value={securityQuestion}> {@html securityQuestion} </option> 
                {/each}
            </select>
        {/if}

        <label class="label" for="security_a">Security Question Answer</label>
        <input  class="input"
                name="security_a"
                id="security_a"
                type="text"
                required/>

        <input  class="input"
                style=" background-color: rgb(var(--color-secondary-500));
                        color: rgb(var(--color-surface-500));
                        height:50px;
                        width:130px;"
                id="btn"
                type="submit"
                disabled={form?.registrationSuccess}/>
    </form>
</div>

<style>

    #registered {
        color: green;
    }

    #error {
        color: maroon;
    }

</style>