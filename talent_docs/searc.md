Search for Profiles
GET
https://api.talentprotocol.com/search/advanced/profiles
Search For Profiles
This endpoint /search/advanced/profiles allows you to fetch Profiles that match specific criteria.

The Search Criteria:
tags (all tags should exist in the matching Profiles)
score range for a Scorer
credentials
identity (free text search on any of the Profile properties that constitute an identity)
profile ids
wallet addresses
human checkmark
main role
open to
custom query
Exact Match
Some of the search use cases above, support exact match search. You will find relevant information in each individual search case below.

The endpoint
Example:

$ curl -G -X GET 'https://api.talentprotocol.com/search/advanced/profiles' \
-H 'Accept: application/json' \
-H 'X-API-KEY: 959...c372' \
--data-urlencode 'query={"score": {"max": 12345, "min": 100}, "humanCheckmark": true, "credentials": [{"slug": "base_basename", "pointsRange": {"min": 1}}]}' \
--data-urlencode 'sort={"score": { "order": "desc"}, "id": { "order": "desc" }	}' \
--data-urlencode 'page=1' \
--data-urlencode 'per_page=3'


Example response
{
  "profiles": [
    {
      "calculating_score": false,
      "created_at": ...

    },
    ...
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 400,
    "total": 10000,
    "total_for_page": 25,
    "point_in_time_id": null,
    "search_after": null
  }
}

Above, you can see how we sort and how we paginate.

Note: The query parameters need to be URL encoded.

Important: The pagination technique using page parameter is adequate for UI-kind clients that do not need to browse the pages with absolute accuracy. While travelling from page to the next, any additions or deletions of profiles might interfere with your results, which means that you might see some records appearing to more than one page. It also has some other limitations: a) It does not allow one to travel more than 10,000 (ten thousand) profiles ahead. i.e. the page x per_page product cannot be more than 10,000, and b) the per_page can't be more than 25. There is also the point_in_time_id technique which is more adequate if one wants to go from one page to the next with consistent results from page to page. It allows to travel all the profiles and the per_page has an upper limit of 250. See the section Pagination

Search Cases
Search by profile ids:
{
  "query": {
    "profileIds":["ab0bbf06...profile uuid...3a83c8e14", "34ec610...profile uuid...38482bfb1"]
  },
  "sort": {
    "id": {
      "order": "asc"
    }
  },
  "page": 1,
  "per_page": 25
}


The profile uuids given can be partial. All the Profiles whose uuid includes the given terms will be returned.

Note that in sorting, when we refer to id we refer to an internal id that our database uses to identify Profiles. However, the profileIds refers to the public identifiers of profiles which are uuids.

Exact Match
Searching by profile ids supports exact match searching. This means that you can pass: "exactMatch": true as part of the "query" property object. In that case, only the profiles that have uuid equal to any of the given terms will be return. Exact match is case insensitive.

Search by wallet addresses:
{
  "query": {
    "walletAddresses":["0x324e9e13d...wallet address...7e94462", "0xec4a...wallet address...eae7ca"]
  },
  "sort": {
    "id": {
      "order": "asc"
    }
  },
  "page": 1,
  "per_page": 25
}


The wallet addresses given can be partial. Any Profile with wallet address that include the terms given will be returned.

Exact Match
Searching by wallet addresses supports exact match searching. This means that you can pass: "exactMatch": true as part of the "query" property object. In that case, only the profiles that have a wallet address equal to any of the given terms will be returned. Exact match is case insensitive.

Search by tags:
This will bring the Profiles with all the tags in the query.

{
  "query": {
    "tags":["tag 1", "tag 2", "tag 3"]
  },
  "sort": {
    "id": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}

Search by main role:
This will bring the Profiles with any of the main roles in the query.

{
  "query": {
    "mainRole":["community", "engineering", "design"]
  },
  "sort": {
    "id": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}

Main role can be one of:

community
creator
data_research
design
engineering
founder_ceo
growth_sales
investor
operations
other
product
unknown
Note: Each profile can have only one main role.

Search by open to:
This will bring the Profiles with any of the open to in the query.

{
  "query": {
    "openTo":["co_founders_collaborators", "full_time_roles"]
  },
  "sort": {
    "id": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}

OpenTo can be one of:

full_time_roles
freelance_contract_work
co_founders_collaborators
investment_funding
not_open_to
Note: Each profile can have only one open to.

Search by identity
We want to be able to search by identity.

{
  "query": {
    "identity":"an identity"
  },
  "sort": {
    "id": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}

This will return any Profile that has an identity containing the given term.

With identity we generalize the following properties of the Profile:

Top Level Fields
Display Name
Email
ENS
Main Wallet
Name
Talent Protocol ID
User Display Name (if Profile is associated to a User)
Username (if Profile is associated to a User)
User UUID (if Profile is associated to a User)
UUID
Nested Fields
Identifier of any Account associated with the Profile
Username of any Account associated with the Profile
Name of any Social Account associated with the Profile
Display Name of any Social Account associated with the Profile
External ID of any Social Account associated with the Profile
Identifiers for any onchain entity, like Basename, or ENS name or CyberID e.t.c.
Exact Match
Searching by identity supports exact match searching. This means that you can pass: "exactMatch": true as part of the "query" property object. In that case, only the Profiles that have an identity equal to the given term will be returned. Exact match is case insensitive.

This is also true for the scope limited identity search.

Search by Identity - Scope Limited Search
One might want to limit the scope of identity search to a specific data source. In that case, the data source should be used as a prefix to the search term.

For example:

ens:panos

The supported scope prefixes are:

basename
cyberid
displayName
email
ens
farcaster
github
lens
linkedin
mainWallet
name
profileId
social
talentProtocol
twitter
userDisplayName
username
userUuid
uuid
wallet
x
Example query:

{
  "query": {
    "identity": "ens: panagiotismatsinopoulos.eth"
  }
}

Note that any Profile that includes the term given on their ENS identifier (for this example), will be returned.

Exact Match
Exact match is supported for scope limited identity search.

Search by Credentials
This is an example to search for credentials AND value range. It brings all the profiles that have all the matching credentials. Note that if a value range is given, and min is missing, it is considered 1. max in the value range is optional.

A credential can be specified by:

slug. This is optional. Exact match is performed. Note that slugs are unique across the whole set of credentials, regardless of the Data Issuer. The list of credential slugs per data issuer is given by the endpoint GET /data_issuers_meta. See more here. At least one of slug or category should be specified. But if slug is specified, then there is no reason to specify the category too, or if category is specified too, then category should match the category of the slug. Otherwise no results will be returned, since each credential, a.k.a. slug, belongs to a very specific category.
category Optional. If present exact match is performed. The names of the categories are given in the same endpoint GET /data_issuers_meta. See more here.
valueRange
min Optional. If not given, it is assumed 1
max. Optional. If not given, it is assumed 2^256 - 1, i.e. 115792089237316195423570985008687907853269984665640564039457584007913129639935
readableValue Optional. If present, search does contains comparison to match all the given data points that include the given value in their readableValue value.
A credential will match if it satisfies ALL the conditions. And if there are many credentials in the query, then ALL of them should match.

Example:

{
  "query": {
    "credentials: [
      {
        "slug": "base_basecamp", "valueRange": { "min": 10, "max": 30}
      },
      {
        "slug": "arbitrum_out_transactions", "valueRange": {"min": 10, "max": 32}
      }
    ]
  },
  "sort": {
    "score": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}


List of Credentials by Data Issuer
Use the endpoint GET /data_issuers_meta. See more here.

Search by Human Checkmark
This is an example to search for builders that have a Human Checkmark. It brings all the Profiles that have human checkmark true.

{
  "query": {
    "humanCheckmark": true
  },
  "sort": {
    "score": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}
'

If you want to get Profiles that do not have the human checkmark, you should give the value false.

If you don't specify the humanCheckmark, the query returns both with true and false.

Search With Custom Query
Important This feature is only available to paying API keys.

It allows the client application to use the OpenSearch Query DSL to search for profiles.

This is an example request:

{
  "query": {
    "customQuery": {
      "bool": {
        "must": [
          {
            "regexp": {
              "location": {
                "value": ".*london.*"
                }
              }
            }
        ]
      }
    }
  },
  "sort": {
    "score": {
      "order": "desc"
    }
  },
  "page": 1,
  "per_page": 25
}

This example, returns all the profiles that have location that includes the word london.

Fields for Custom Query
If you want to know the fields that can be used for custom query, you can issue the following request:

$ curl -v -X GET /search/advanced/metadata/fields/profiles/default \
  -H 'Accept: application/json' \
  -H 'X-API-KEY: <paying-api-key>

It will return a JSON response like the following:

[
  {
    "name": "bio",
    "label": "Bio",
    "inputType": "text"
  },
  {
    ...
  }
  ...
]

The returned array defines the fields that can be used to query using "customQuery".

Each object describes a field with the following properties:

name: This is the name of the field. This is what it should be used in the customQuery.
label: This is a descriptive label that allows you to expose on your UI to build a query builder.
inputType: This is what is type of the value that can be accepted for the particular field. It can be one of text, number, datetime-local.
valueEditorType: This is what the UI element to give a value could be. It can be one of: text, select, multi-select checkbox.
values: This is a list of values with the candidate values one can set to search for.
The name is the most important information here. Because this is the one you will use in the customQuery object. The other properties are only useful if you want to build your own query builder UI.

Note that the schema of each object is based on the React Query Builder component.

Using fetch on Browser
The search endpoints are GET endpoints that can accept the params either in the body of the request or URL encoded. The latter case is useful when using fetch() requests from a browser.

Example:

const data = {
  query: {
    score: {
      min: 10,
      max: 60
    }
  },
  sort: {
    score: {
      order: "desc"
    }
  },
  page: 1,
  per_page: 25
};

const queryString = Object.keys(data)
  .map(key => `${key}=${encodeURIComponent(JSON.stringify(data[key]))}`)
  .join("&");

const response = await fetch(
  `${ENV_VARS.API_BASE_URL}/search/advanced/profiles?${queryString}`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-Key": ENV_VARS.TALENT_PROTOCOL_API_KEY
    }
  }
);
const jsonResponse = await response.json();
console.debug("jsonResponse", jsonResponse);

Pagination
Pagination requires sorting. So, we suggest that you always use the sort key in your request and consistently send the same sort conditions when moving from one page to the next. This is true regardless of the pagination mode you use (i.e. page-based or point-in-time-based pagination)

per_page
This is an integer which defines how many results (Profiles) a response can have.

This cannot be more than 25 for free customers and no more than 250 for paying customers.

page option
The default pagination with the page param may not yield consistent results when going from one page to the next. This is because new documents might be indexed or deleted in-between. This pagination mode has the restriction that it does not allow you to travel over 10,000 (ten thousand) profiles. I.e. the product page X per_page can't be more than 10,000. If you want to travel more profiles, you will have to use the point_in_time pagination mode.

Point In Time option
For consistent travel from one page to the next, as well as for travelling all profiles, we suggest the Point in Time technique.

Point In Time option is only available to paying customers.

It works as follows:

Each search from page to page is characterized by a point_in_time_id.

Visiting the first page:

You don't pass the page parameter.
You pass the keep_alive_minutes parameter, which is an integer that can't be more than 60. It represents how much time a result set stays alive in between searches for the same point_in_time_id.
You don't pass a point_in_time_id. You pass it only from the second page and beyond.
You don't pass a search_after. You pass it only from the second page and beyond.
The search for the first page returns some meta-data that you have to use on your search for the next page:

point_in_time_id
search_after
On search for the next page, you have to pass these extra parameters with the values that you got from the result of the previous page.

Important: This is designed to be used by clients, such as scripts, that need to browse from page to page the whole search index. The backend consumes a lot of resources in supporting this feature.

Important: The keep_alive_minutes can't be more than 60 minutes. This should be enough for the client script to process the results of one page before going to fetch the next page. If this number seems to be small to you, then please contact tech@talentprotocol.com.

Sorting
The sort parameter allows to sort results by the score and by id. We are suggesting that you use both, because two Profiles might have the same score.

This is a useful example:

{
  "sort": {
    "score": {
      "order": "desc",
      "scorer": "Builder Score"
    },
    "id": {
      "order": "desc"
    }
  }
}

Caching
This endpoint returns cached data for free customers. Paying customers get up-to-date data.

Don't Return Matching Documents
Using the query parameter returnItems with value false, you can get statistics and aggregations without getting back the documents that match your filter query.

Example:

$ curl -G -X GET 'https://api.talentprotocol.com/search/advanced/profiles' \
-H 'Accept: application/json' \
-H 'X-API-KEY: 959...372' \
--data-urlencode 'query={"score": {"max": 12345, "min": 100}, "humanCheckmark": true, "credentials": [{"slug": "base_basename", "pointsRange": {"min": 1}}]}' \
--data-urlencode 'sort={"score": { "order": "desc"}, "id": { "order": "desc" }	}' \
--data-urlencode 'returnItems=false' \
--data-urlencode 'page=1' \
--data-urlencode 'per_page=3'


Other Examples:
Get the Top Builder Score Profiles
This one is returning the top 25 based on their Builder Score.

$ curl -G -X GET 'https://api.talentprotocol.com/search/advanced/profiles' \
-H 'Accept: application/json' \
-H 'X-API-KEY: 959...c372' \
--data-urlencode 'query={}' \
--data-urlencode 'sort={"score": { "order": "desc"}, "id": { "order": "desc" }	}' \
--data-urlencode 'page=1' \
--data-urlencode 'per_page=25'


Get the Maximum Builder Score for the Profiles Selected - Aggregation Example
Note that this also doesn't return the items, only the aggregation result.

$ curl -G -X GET 'https://api.talentprotocol.com/search/advanced/profiles' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer ey...Fw' \
-H 'X-API-KEY: 95.....72' \
--data-urlencode 'query={"score": {"max": 200, "min": 100}, "humanCheckmark": true, "credentials": [{"slug": "base_basename", "pointsRange": {"min": 1}}]}' \
--data-urlencode 'sort={"score":{"order":"desc"},"id":{"order":"desc"}}' \
--data-urlencode 'page=1' \
--data-urlencode 'per_page=3' \
--data-urlencode 'returnItems=false' \
--data-urlencode "aggregations=$(cat $HOME/Doc...search/advanced/profiles/examples/aggregation_to_url_encode1.json)"


Where aggregation_to_url_encode1.json is:

{
  "scores_nested": {
    "nested": {
      "path": "scores"
    },
    "aggs": {
      "filtered_scores": {
        "filter": {
          "bool": {
            "must": [
              {"term": { "scores.scorer_slug": "builder_score"}},
              {
                "range": {
                  "scores.points": {
                    "gte": 100,
                    "lte": 200
                  }
                }
              }
            ]
          }
        },
        "aggs": {
          "maximum_score": {
            "max": {
              "field": "scores.points"
            }
          }
        }
      }
    }
  }
}

Request
Query Parameters
query
object
required
aggregations
object
returnItems
boolean
Default value: true
sort
object
page
number
per_page
number
keep_alive_minutes
number
Possible values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]

point_in_time_id
string
search_after
object[]
view
string
Possible values: [normal, minimal, scores_minimal]

Default value: normal
debug
string
Header Parameters
X-API-KEY
string
required
Your Talent Protocol API Key

Authorization
string
Optional: The JWT to identify a calling User

Example (auto)
{
  "profiles": [
    {
      "id": "string",
      "bio": "string",
      "created_at": "2024-07-29T15:51:28.071Z",
      "display_name": "string",
      "human_checkmark": true,
      "image_url": "string",
      "location": "string",
      "name": "string",
      "calculating_score": true,
      "tags": [
        "string"
      ],
      "verified_nationality": true,
      "builder_score": {
        "points": 0,
        "last_calculated_at": "2024-07-29T15:51:28.071Z"
      },
      "scores": [
        {
          "slug": "string",
          "points": 0,
          "last_calculated_at": "2024-07-29T15:51:28.071Z"
        }
      ]
    }
  ],
  "pagination": {
    "current_page": 0,
    "last_page": 0,
    "total": 0,
    "total_for_page": 0,
    "point_in_time_id": "string",
    "search_after": [
      0,
      "string"
    ]
  }
}