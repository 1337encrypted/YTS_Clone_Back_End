# YTS_Clone_Back_End

## Standard Response

```json
{
    "success": "boolean",
    "error": "string|false",
    "data": "object"
}
```

## Error Handling

All errors are automatically handled and returned through the `error` field in the standard response. Please refer to [error.codes.config.json](/src/configs/error.codes.config.json) for common error messages.

## API Docs

Here you can find a curated list of APIs that are available for testing and deployment to front-end.

### Table of Contents

-   [YTS **`/yts`**](/docs/routes/yts.route.docs.md)
    -   [GET **`/list_movies`**](/docs/routes/yts.route.docs.md#list-movies)
    -   [GET **`/movie_details`**](/docs/routes/yts.route.docs.md#movie-details)
-   [User **`/user`**](/docs/routes/user.route.docs.md)
    -   [POST **`/auth`**](/docs/routes/user.route.docs.md#login)
    -   [POST **`/register`**](/docs/routes/user.route.docs.md#register)
    -   [GET **`/auth`**](/docs/routes/user.route.docs.md#auth)
    -   [DELETE **`/auth`**](/docs/routes/user.route.docs.md#logout)
