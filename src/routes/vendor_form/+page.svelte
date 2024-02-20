<script>
    export let form
</script>

<head>
    <title>Vendor Registration</title>
</head>

<h1>Vendor Account Creation Form</h1>

{#if form?.registrationSuccess}
    <h2 id="registered">Congratulations, you are now a vendor.</h2>
{/if}

<form method="post" action="?/registerVendor">
    <div class="input_div">
        <label for="username">Username</label>
        <input id="username" type="text" required/>
    </div>

    <div class="input_div">
        <label for="password">Password</label>
        <input id="password" type="password" required/>
    </div>

    <div class="input_div">
        <label for="phone_no">Phone Number</label>
        <input id="phone_no" type="text" required/>
    </div>

    <div class="input_div">
        <label for="security_q">Security Question</label>
        <input id="security_q" type="text" required/>
    </div>

    <div class="input_div">
        <label for="security_a">Security Question Answer</label>
        <input id="security_a" type="text" required/>
    </div>

    <div class="input_div">
        <input id="submission" type="submit" disabled={form?.registrationSuccess}/>
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
</style>