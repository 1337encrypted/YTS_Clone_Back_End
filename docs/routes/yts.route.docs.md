# YTS Route API Docs (`/yts`)

<a name="list-movies"></a>

## `/yts/list_movies`

Use this API to query all movies.

**Method**: `GET`

**URL Parameters**:

```json
{
    "limit": "integer",
    "page": "integer",
    "quality": "enum",
    "minimum_rating": "integer",
    "query_term": "string",
    "genre": "enum",
    "sort_by": "enum",
    "order_by": "enum",
    "with_rt_ratings": "boolean"
}
```

| Fields | Type | Required | Notes |
|--------|------|----------|-------|
| limit | Integer | No (20) | 0 < **limit** <= 50 |
| page | Integer | No (1) | 0 < **page** |
| quality | Enum | No (All) | ∈ ("720p", "1080p", "2160p", "3D") |
| minimum_rating | Integer | No (0) | 0 <= **minimum_rating** < 10 |
| query_term | String | No ("") | Search term/phrase/keyword |
| genre | Enum | No (All) | ∈ ("comedy", "sci-fi", "horror", "romance", "action", "thriller", "drama", "mystery", "crime", "animation", "adventure", "fantasy", "comedy-romance", "action-comedy", "superhero") |
| sort_by | Enum | No (date_added) | ∈ ("title", "year", "rating", "peers", "seeds", "download_count", "like_count", "date_added") |
| order_by | Enum | No (desc) | ∈ ("asc", "desc") |
| with_rt_ratings | Boolean | No (false) | Whether to include ratings from [RottenTomatoes](https://www.rottentomatoes.com/about#whatisthetomatometer) in the query results |

### **Success Response** (`application/json`)

```json
{
    "success": true,
    "error": false,
    "data": {
        "apiResponse": {
            "status": "ok",
            "status_message": "Query was successful.",
            "data": {
                "movie_count": "integer",
                "limit": "integer",
                "page_number": "integer",
                "movies": [{
                    "id": "integer",
                    "url": "url",
                    "imdb_code": "string",
                    "title": "string",
                    "title_english": "string",
                    "title_long": "string",
                    "slug": "string",
                    "year": "integer",
                    "rating": "float",
                    "runtime": "integer",
                    "genres": ["string"],
                    "summary": "string",
                    "description_full": "string",
                    "synopsis": "string",
                    "yt_trailer_code": "string",
                    "language": "string",
                    "mpa_rating": "string",
                    "background_image": "url",
                    "background_image_original": "url",
                    "small_cover_image": "url",
                    "medium_cover_image": "url",
                    "large_cover_image": "url",
                    "state": "string",
                    "torrents": [{
                        "url": "url",
                        "hash": "string",
                        "quality": "string",
                        "type": "string",
                        "seeds": "integer",
                        "peers": "integer",
                        "size": "string",
                        "size_bytes": "long",
                        "date_uploaded": "string",
                        "date_uploaded_unix": "long"
                    }],
                    "date_uploaded": "string",
                    "date_uploaded_unix": "long"
                }]
            }
        }
    }
}
```

**NOTE**: Refer to [pastebin.com/qJC18aC4](https://pastebin.com/qJC18aC4) for an example response.

### [**Error codes**](/src/configs/error.codes.config.json)

- `ERR_LIM`
- `ERR_PG`
- `ERR_QLT`
- `ERR_MINR`
- `ERR_GNR`
- `ERR_SBY`
- `ERR_OBY`
- `ERR_RTR`
- `ERR_APIF`
- `ERR_INTE`

---

<a name="movie-details"></a>

## `/yts/movie_details`

Use this API to query movie details of a single movie.

**Method**: `GET`

**URL Parameters**:

```json
{
    "movie_id": "string",
    "imdb_id": "string",
    "with_images": "boolean",
    "with_cast": "boolean"
}
```

| Fields | Type | Required | Notes |
|--------|------|----------|-------|
| movie_id | String | Yes if `imdb_id` is not specified | Movie id |
| imdb_id | String | Yes if `movie_id` is not specified | IMDB Movie id |
| with_images | Boolean | No (false) | Whether to include images in the response |
| with_cast | Boolean | No (false) | Whether to include cast details in the response |

### **Success Response** (`application/json`)

```json
{
    "success": true,
    "error": false,
    "data": {
        "apiResponse": {
            "status": "ok",
            "status_message": "Query was successful.",
            "data": {
                "movie": {
                    "id": "integer",
                    "url": "url",
                    "imdb_code": "string",
                    "title": "string",
                    "title_english": "string",
                    "title_long": "string",
                    "slug": "string",
                    "year": "integer",
                    "rating": "float",
                    "runtime": "integer",
                    "genres": ["string"],
                    "download_count": "integer",
                    "like_count": "integer",
                    "description_intro": "string",
                    "description_full": "string",
                    "yt_trailer_code": "string",
                    "language": "string",
                    "mpa_rating": "string",
                    "background_image": "string",
                    "background_image_original": "string",
                    "small_cover_image": "url",
                    "medium_cover_image": "url",
                    "large_cover_image": "url",
                    "medium_screenshot_image1": "url",
                    "medium_screenshot_image2": "url",
                    "medium_screenshot_image3": "url",
                    "large_screenshot_image1": "url",
                    "large_screenshot_image2": "url",
                    "large_screenshot_image3": "url",
                    "cast": [{
                        "name": "string",
                        "character_name": "string",
                        "url_small_image": "url",
                        "imdb_code": "string"
                    }],
                    "torrents": [{
                        "url": "url",
                        "hash": "string",
                        "quality": "string",
                        "type": "string",
                        "seeds": "integer",
                        "peers": "integer",
                        "size": "string",
                        "size_bytes": "long",
                        "date_uploaded": "string",
                        "date_uploaded_unix": "long"
                    }],
                    "date_uploaded": "string",
                    "date_uploaded_unix": "long"
                }
            }
            "@meta": {
                "server_time": "long",
                "server_timezone": "string",
                "api_version": "integer",
                "execution_time": "string"
            }
        }
    }
}
```

**NOTE**: Refer to [pastebin.com/gwY0Nq3H](https://pastebin.com/gwY0Nq3H) for an example response.

### [**Error codes**](/src/configs/error.codes.config.json)

- `ERR_NOID`
- `ERR_INVID`
- `ERR_WIE`
- `ERR_WCE`
- `ERR_APIF`
- `ERR_INTE`
