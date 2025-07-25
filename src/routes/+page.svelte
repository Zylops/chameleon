<script lang="ts">
    let game: Game = $state({
        started: false,
        topic: "",
        players: 1,
        category: "",
        chameleon: -99,
    })

    let engine: GameEngine = $state({
        started: false,
        reveal: false,
        currentCard: 0,
        changing: false,
        changeTime: 5000, // time card takes to finish flipping, decrease if phones are passed faster
        loading: false
    })

    async function getWord() {
        const res:Response = await fetch("api/" + (game["category"] ? game["category"] : "general"))
        const data: WordResponse = await res.json()
        return data["word"]
    }

    

    function getChameleon(): number {
        let min = Math.ceil(0);
        let max = Math.floor(game["players"]-1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    async function startGame() {
        engine["loading"] = true
        game["topic"] = await getWord()
        game["chameleon"] = getChameleon()

        engine["reveal"] = false
        engine["currentCard"] = 0
        engine["started"] = true
        engine["changing"] = false
        
    }

    function changeCurrentPlayer() {
        engine["changing"] = true

        setTimeout(()=> {
            engine["currentCard"] += 1
            engine["changing"] = false
        }, engine["changeTime"])

    }

</script>

<style>


     .bugBg {
        background-color: rgb(64,173,72)
     }

     .imposterBg {
        background-color: rgb(88,71,157)
     }

     .imposterColor {
        color: rgb(88,71,157)
     }

     .bugColor {
        color: rgb(64,173,72)
     }

     .flipper {
        transform-style: preserve-3d;
	    animation: flip 2s infinite linear;
     }

     @keyframes flip {
        0% {
            transform: rotateY(0deg);
        }
        100% {
            transform: rotateY(360deg);
        }
    }
</style>

<main class="m-8 md:m-0 md:mt-32 md:flex justify-center mt-32 items-center gap-32" class:hidden={engine["started"]}>
<div class="logo md:flex justify-center">
    <img src="/bug.svg" alt="bug" class="w-30 md:w-80">
</div>
<div class="mt-5 md:mt-0">
    <div class="md:flex gap-3 justify-between">
        <div>
            <h1 class="text-2xl">How many players?</h1>
            <p class="text-xs">One will be given the role of imposter.</p>
        </div>
        <input type="number" name="players" id="players" bind:value={game["players"]} class="w-20 mt-3 md:mt-0">
    </div>

    <div class="md:flex justify-between gap-3 mt-6">
        <div>
            <h1 class="text-2xl">Category?</h1>
            <p class="text-xs">Leave blank for general topics.</p>
        </div>
        <input type="text" name="players" id="players" bind:value={game["category"]} class="md:ml-3 mt-3 md:mt-0">
    </div>

    <button id="start" onclick={!(engine["loading"]) ? startGame : ()=>{}} class="p-4 text-center mt-5 cursor-pointer shadow  text-white font-bold w-full bugBg " class:opacity-50={engine["loading"]} class:cursor-not-allowed={engine["loading"]}>Start</button>
</div>
</main>




{#if game["players"] > 0 && engine["started"] && engine["currentCard"] <= game["players"]-1}
<div class="game flex justify-center min-w-screen w-full min-h-screen md:min-h-0 items-center md:items-start">


    <div class="card shadow rounded bg-green my-6 w-3/4 md:w-1/4 " class:flipper={engine["changing"]}>
        <div class="w-full text-white font-bold bugBg text-center  p-4 ">
            <p class:opacity-0={engine["changing"]}>Player {engine["currentCard"]+1}</p>
        </div>
        <div class="flex justify-center items-center text-center">
            <div class="content ">
                <div class="">
                    {#if engine["changing"]} <p class="mt-4 text-3xl font-light">Pass the phone now.</p> {/if}
                    <div class:opacity-0={engine["changing"]} class="h-full py-20">
                        {#if engine["currentCard"] == game["chameleon"]}
                        <p class="font-semibold text-lg">You are the</p>
                        <p class="font-bold text-xl imposterColor">chameleon</p>
                        {:else}
                        <p class="font-semibold text-lg">The topic is:</p>
                        <p class="font-bold text-xl bugColor" >{game["topic"]}</p>
                        {/if}
                    </div>
                </div>
            
            </div>
            
        </div>
        <div class="footer">
            <div class:opacity-0={engine["changing"]}>
                <p class="text-xs text-center my-3">Once youve read your cue, press the Next button and pass the phone to the next player.</p>
                <button class="w-full imposterBg font-bold text-white p-3 cursor-pointer" onclick={changeCurrentPlayer}>Next</button>
            </div>
        </div>
    </div>

</div>
{/if}

{#if engine["currentCard"] > game["players"]-1 && engine["started"]}
<div class="mt-6 flex justify-center items-center min-w-screen min-h-screen">
    <div>
        {#if engine["reveal"] }
            <p class="font-black text-4xl">Player {game["chameleon"]+1}</p>
            <p>was the chameleon.</p>
        {/if}
        <button onclick={() => {engine["reveal"] = true}} class="w-full bg-black font-bold text-white p-2 my-4 imposterBg cursor-pointer">Reveal Chameleon</button>
        <button onclick={() => {window.location = "/"}} class="w-full bg-black font-bold text-white p-2 bugBg cursor-pointer mt-8">New Game</button>
    </div>

</div>
{/if}