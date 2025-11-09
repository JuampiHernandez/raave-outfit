feedbackRate limits

Rate limits regulate the number of requests you can make to the Gemini API within a given timeframe. These limits help maintain fair usage, protect against abuse, and help maintain system performance for all users.

How rate limits work
Rate limits are usually measured across three dimensions:

Requests per minute (RPM)
Tokens per minute (input) (TPM)
Requests per day (RPD)
Your usage is evaluated against each limit, and exceeding any of them will trigger a rate limit error. For example, if your RPM limit is 20, making 21 requests within a minute will result in an error, even if you haven't exceeded your TPM or other limits.

Rate limits are applied per project, not per API key.

Requests per day (RPD) quotas reset at midnight Pacific time.

Limits vary depending on the specific model being used, and some limits only apply to specific models. For example, Images per minute, or IPM, is only calculated for models capable of generating images (Imagen 3), but is conceptually similar to TPM. Other models might have a token per day limit (TPD).

Rate limits are more restricted for experimental and preview models.

Usage tiers
Rate limits are tied to the project's usage tier. As your API usage and spending increase, you'll have an option to upgrade to a higher tier with increased rate limits.

The qualifications for Tiers 2 and 3 are based on the total cumulative spending on Google Cloud services (including, but not limited to, the Gemini API) for the billing account linked to your project.

Tier	Qualifications
Free	Users in eligible countries
Tier 1	Billing account linked to the project
Tier 2	Total spend: > $250 and at least 30 days since successful payment
Tier 3	Total spend: > $1,000 and at least 30 days since successful payment
When you request an upgrade, our automated abuse protection system performs additional checks. While meeting the stated qualification criteria is generally sufficient for approval, in rare cases an upgrade request may be denied based on other factors identified during the review process.

This system helps maintain the security and integrity of the Gemini API platform for all users.

Standard API rate limits
The following table lists the rate limits for all standard Gemini API calls.

Note: Any values that show * have no published rate limits.
Free Tier
Tier 1
Tier 2
Tier 3
Model	RPM	TPM	RPD
Text-out models
Gemini 2.5 Pro	5	250,000	100
Gemini 2.5 Flash	10	250,000	250
Gemini 2.5 Flash-Lite	15	250,000	1,000
Gemini 2.0 Flash	15	1,000,000	200
Gemini 2.0 Flash-Lite	30	1,000,000	200
Live API
Gemini 2.5 Flash Live	3 sessions	1,000,000	*
Gemini 2.5 Flash Preview Native Audio Dialog	1 session	25,000	5
Gemini 2.5 Flash Experimental Native Audio Thinking Dialog	1 session	10,000	5
Gemini 2.0 Flash Live	3 sessions	1,000,000	*
Multi-modal generation models
Gemini 2.5 Flash Preview TTS	3	10,000	15
Gemini 2.0 Flash Preview Image Generation	10	200,000	100
Other models
Gemma 3 & 3n	30	15,000	14,400
Gemini Embedding	100	30,000	1,000
Deprecated models
Gemini 1.5 Flash (Deprecated)	15	250,000	50
Gemini 1.5 Flash-8B (Deprecated)	15	250,000	50
Specified rate limits are not guaranteed and actual capacity may vary.

Batch Mode rate limits
Batch Mode requests are subject to their own rate limits, separate from the non-batch mode API calls.

Concurrent batch requests: 100
Input file size limit: 2GB
File storage limit: 20GB
Enqueued tokens per model: The Batch Enqueued Tokens column in the rate limits table lists the maximum number of tokens that can be enqueued for batch processing across all your active batch jobs for a given model. See in the standard API rate limits table.
How to upgrade to the next tier
The Gemini API uses Cloud Billing for all billing services. To transition from the Free tier to a paid tier, you must first enable Cloud Billing for your Google Cloud project.

Once your project meets the specified criteria, it becomes eligible for an upgrade to the next tier. To request an upgrade, follow these steps:

Navigate to the API keys page in AI Studio.
Locate the project you want to upgrade and click "Upgrade". The "Upgrade" option will only show up for projects that meet next tier qualifications.
After a quick validation, the project will be upgraded to the next tier.

Request a rate limit increase
Each model variation has an associated rate limit (requests per minute, RPM). For details on those rate limits, see Gemini models.

Request paid tier rate limit increase

We offer no guarantees about increasing your rate limit, but we'll do our best to review your request.

