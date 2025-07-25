<p align="center">
    <img src="https://img.shields.io/github/license/Zylops/chameleon">
	<a href="https://gitHub.com/Zylops/chameleon/graphs/commit-activity"><img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" /></a>
	<a href="https://gitHub.com/Zylops/chameleon/issues/"><img alt="GitHub Issues" src="https://img.shields.io/github/issues/Zylops/chameleon.svg" /></a>
    <img src="https://img.shields.io/badge/framework-svelte-orange">
	<a href="https://github.com/Zylops/chameleon"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Zylops/chameleon?style=social" /></a>
</p>


This is a web adaptation of the party game **Chameleon**, built with [SvelteKit](https://kit.svelte.dev/) and TypeScript. The app uses Google's Gemini API to generate topics for each round.

## Game Overview

- **Players**: Everyone except one person (the "imposter") receives a secret topic.
- **Imposter**: Does not know the topic.
- **Goal**: Players take turns saying something about the topic. After all turns, everyone tries to deduce who the imposter is.

## How This App Works

- The app generates a topic using Gemini LLM.
- Each player is dealt their role (topic or imposter) one at a time.
- The app is designed to run on a central server (laptop/desktop) and be accessed by a single phone, which is passed around to each player for their turn.
- The app does **not** handle the actual gameplay or voting—just topic/role assignment.

## Stack

- **Frontend**: SvelteKit, TypeScript, TailwindCSS
- **LLM Topic Generation**: Gemini API (`@google/genai`)

## Setup

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Set up Gemini API key**:
    - Create a `.env` file in the root:
      ```
      GEMINI_KEY=your_google_gemini_api_key
      ```

3. **Run the development server**:
    ```bash
    npm run dev -- --open # open to local network so you can connect to the ip from your phone
    ```

4. **Connect with a phone**:
    - Open the app in a browser on your PC.
    - Connect to the app from a phone (same network).
    - Pass the phone around for each player's turn.

## Usage

1. Enter the number of players.
2. (Optional) Enter a category for the topic.
3. Press **Start**.
4. Each player views their role (topic or imposter) and passes the phone to the next player.
5. At the end of the game, use the "Reveal the Imposter" button.

## Customizing topic generation  
You can modify the prompt used for topic generation by editing the `prompt` variable in [`src/lib/index.js`](src/lib/index.js).
  
Make sure to include `{CATEGORY}` in your prompt so the chosen category can be injected during topic generation.

## Notes

- The app is intended for local play, not online multiplayer.
- Only one device (phone) is used for passing around.
- The Gemini API is used for generating topics; ensure your API key is valid.

## License

MIT

---
Inspired by [Chameleon](https://bigpotato.co.uk/products/chameleon)