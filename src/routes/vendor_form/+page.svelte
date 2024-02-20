<script>
    
</script>

<h1>Vendor Account Creation Form</h1>

<form method="post">
    <div class="input_div">
        <label for="username" title="Enter your username. Will not necessarily be displayed publicly.">Username</label>
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
        <input id="submission" type="submit"/>
    </div>
</form>

<style>
    label {
        display: block;
    }

    .input_div {
        margin: 10px;
    }
</style>