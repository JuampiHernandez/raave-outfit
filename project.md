1. Goal & Core Concept

Build a small web app where a user inputs a Twitter / Farcaster / Lens / GitHub handle, and the app returns a styled profile picture of that person wearing an outfit with dress code:

“Colores del Sol (red, orange, yellow, purple!)”

Core flow

User selects platform + inputs handle.

Backend resolves that identity via Talent API and fetches the profile picture URL.

Backend sends the picture + a custom text prompt to the Google Nano / Imagen editing API.

Model returns a new image; frontend displays it as “Your Colores del Sol outfit”.

2. Tech Stack (suggested)

Frontend: Next.js + React, TypeScript, Tailwind CSS (or similar).

Backend: Next.js API routes or a small Node/Express server (your choice).

External APIs:

Talent Protocol API – to get profile + avatar URL from identity handle.

Google Imagen / “nano banano” image editing API – to generate the outfit image.

Use env vars for all API keys.

3. High-Level Architecture
Components

Frontend

Input form: platform selector + handle input.

Loading state, error states.

Result view: original avatar + generated outfit image.


4. User Flows
4.1 Main Flow: Generate Outfit

User opens homepage.

User picks one of: Twitter, Farcaster, Lens, GitHub.

User inputs the handle (without @).

Clicks “Style me”.


Show:

Original avatar (left).

“Colores del Sol” result (right).

Option to “Try another handle”.

4.2 Error Flows

Handle not found on Talent:

Show “Couldn’t find this profile on Talent. Try another handle or platform.”

Talent returns profile without avatar:

Show “This profile has no avatar available.”

Google image API error:

Show “We couldn’t generate your outfit, please try again.”
