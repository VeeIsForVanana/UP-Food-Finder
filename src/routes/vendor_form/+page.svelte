<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    export let data: any;

    console.log(data.securityQuestionsList)
</script>

<head>
    <title>Vendor Registration</title>
</head>

<h1>Vendor Account Creation Form</h1>

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

{#if form?.phoneNumberExists}
    <h2 id="error">Phone number is already registered. Please choose a different one.</h2>
{/if}

{#if form?.phoneError}
    <h2 id="error">Phone number must have format 0XXXXXXXXXX.</h2>
{/if}

<form method="post" action="?/registerVendor" id="vendorRegistration">
    <div class="input_div">
        <label for="username">Username</label>
        <input  name="username"
                type="text"
                required/>
    </div>

    <div class="input_div">
        <label for="password">Password</label>
        <input  name="password"
                type="password"
                required/>
    </div>

    <div class="input_div">
        <label for="phone_number">Phone Number</label>
        <!-- requires format 0XXXXXXXXXX -->
        <input  name="phone_number"
                type="tel"
                placeholder="0XXXXXXXXXX"
                title="0XXXXXXXXXX"
                required/>
    </div>

    <div class="input_div">
        <label for="security_q">Security Question</label>
        <!-- no fixed security questions, let user type their own -->
        {#if data.securityQuestionsList.length == 0}
            <input  name="security_q"
                    type="text"
                    required/>
        
        <!-- display each security question in list -->
        {:else}
            <select name="security_q" form="vendorRegistration" required>
                {#each data.securityQuestionsList as securityQuestion}
                    <option value={securityQuestion}> {@html securityQuestion} </option> 
                {/each}
            </select>
        {/if}
    </div>

    <div class="input_div">
        <label for="security_a">Security Question Answer</label>
        <input  name="security_a"
                type="text"
                required/>
    </div>

    <div class="input_div">
        <input  id="submission"
                type="submit"
                disabled={form?.registrationSuccess}/>
    </div>
</form>

<style>
    label {
        display: block;
    }

    .input_div {
        margin: 10px;
    }

    #registered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>