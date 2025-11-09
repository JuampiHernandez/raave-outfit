# Sign Your Manifest

> Learn what a Mini App manifest is, why signing it matters, and how to generate and add an account association to your app.

Every Mini App needs a **manifest** (`farcaster.json`) file to be recognized by Farcaster clients. It declares your app’s details and domain, and when signed, produces an **Account Association** that proves your Farcaster account owns and can publish the app. Without it, your app won’t work as a Mini App.

### Prerequisites

* A deployed App, accessible via HTTPS
* A Base app account

## Location

Your manifest file must be publicly accessible at:\
`https://your-domain.com/.well-known/farcaster.json`

<Tip> Want to learn more about manifests? 👉 Check out our [Manifest guide](/mini-apps/features/manifest).</Tip>

## Sign Your Manifest

There are two supported ways to sign and generate your manifest:

<Tabs>
  <Tab title="Base Build" icon="star">
    ## Option 1: Base Build Preview Tool

    1. Visit **[Base.dev](https://base.dev)** and sign in with your Base account.
    2. Open **Preview → Account Association**.
    3. Enter your Mini App domain in the App URL field.
    4. Click **Submit**. You should see a notification that you should verify your app ownership. Click **Verify → Sign**.
    5. Follow the on-screen instructions to sign the message in your wallet.
    6. Click **Copy** to copy the generated `accountAssociation` object.
    7. Paste it into your project’s `farcaster.json` under `accountAssociation`.
    8. Redeploy your application to production.

    You should now see three green check marks indicating successful signing.

    <img src="https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=79f16d818f9a11025249e2a383b89362" alt="Main dashboard interface" height="300" className="rounded-lg" data-og-width="1840" data-og-height="852" data-path="images/base-build/basedev-manifest-success.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=280&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=2c46a2c07a626e1f981b61be103a0e13 280w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=560&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=8adf9f5a6232647eceaab4357b6b7f20 560w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=840&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=5de6f936d586ac233ae03d07020393bd 840w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=1100&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=21d4a41b6838a01669ee7638b3039609 1100w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=1650&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=ffc86ba9853e19458f04ce9a830ddbdd 1650w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/basedev-manifest-success.png?w=2500&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=462b5f71bcbbbcdc91342601527f81b6 2500w" />
  </Tab>

  <Tab title="Farcaster">
    ## Option 2: Farcaster Manifest Tool

    1. Go to **[farcaster.xyz](https://farcaster.xyz)** and log in.
    2. Navigate to **Developers → Manifest Tool**.
    3. Enter your domain (exclude `https://` and trailing slashes).
    4. Click **Refresh** to fetch your app.
    5. Select **Generate Account Association**.
    6. Copy the generated object.
    7. Paste it into your project’s `farcaster.json` under `accountAssociation`.
    8. Redeploy your application to production.

    You should now see green check marks indicating successful signing.

    <img src="https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=68843136fbb46678ca087467c646285f" alt="Main dashboard interface" height="300" className="rounded-lg" data-og-width="1258" data-og-height="774" data-path="images/base-build/farcaster-manifest-success.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=280&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=bf304e6ea46a159721f52f1799591e15 280w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=560&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=9c3eeb7b0841d37d7ddd797d8c43e260 560w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=840&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=36d2722a750bc024b408ebe76d9f3110 840w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=1100&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=c13f4f4c82a456b36a56d3507ca4b6d2 1100w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=1650&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=5bb0c4c2999a4960bef035459ee35e9f 1650w, https://mintcdn.com/base-a060aa97/dO8XY3SZV1MJpLBm/images/base-build/farcaster-manifest-success.png?w=2500&fit=max&auto=format&n=dO8XY3SZV1MJpLBm&q=85&s=1cbe6fd88c973f44a6e1f552fa67070e 2500w" />
  </Tab>
</Tabs>

## Example Manifest

Here’s a simplified example of what a `farcaster.json` could look like from the [Base Camp Mini App](https://basecamp25.app/.well-known/farcaster.json):

```json  theme={null}
{
  "accountAssociation": {
    "header": "<generated-header>",
    "payload": "<generated-payload>",
    "signature": "<generated-signature>"
  },
  "miniapp": {
    "version": "1",
    "name": "Basecamp 2025",                // App name
    "description": "Access and manage your experience @ Basecamp", 
    "iconUrl": "https://basecamp25.app/icon.png",   // App icon
    "homeUrl": "https://basecamp25.app",            // Landing page
    "canonicalDomain": "basecamp25.app",            // Must match your domain
    "requiredChains": ["eip155:8453"],              // Chains your app supports
    "tags": ["basecamp", "miniapp"],                // Optional tags
    "requiredCapabilities": [                       // Capabilities your app needs
      "actions.ready",
      "actions.signIn"
    ]
  }
}
```
