// Imports
const Response = require("../models/standard.response.model");
const errors = require("../configs/error.codes.config.json");
const yts = require("../configs/yts.config.json");

// Body
async function ytsListMoviesApiMiddleware(req, res, next) {
    try {
        const queries = req.query;

        // `limit`
        if ("limit" in queries && !/^\d+$/.test(queries.limit)) return res.status(400).send(Response(errors.ERR_LIM));
        const limit = "limit" in queries ? parseInt(queries.limit, 10) : 20;
        if (limit < 1 || limit > 50) return res.status(400).send(Response(errors.ERR_LIM));

        // `page`
        if ("page" in queries && !/^\d+$/.test(queries.page)) return res.status(400).send(Response(errors.ERR_PG));
        const page = "page" in queries ? parseInt(queries.page, 10) : 1;
        if (page < 1) return res.status(400).send(Response(errors.ERR_PG));

        // `quality`
        if ("quality" in queries && (!/^(720p|1080p|2160p|3D)(,(720p|1080p|2160p|3D))*$/.test(queries.quality) || !/^(?!.*(720p|1080p|2160p|3D).*\1.*).+$/.test(queries.quality))) return res.status(400).send(Response(errors.ERR_QLT));
        const quality = "quality" in queries ? queries.quality.split(",").filter(_quality => !!_quality) : undefined;

        // `minimum_rating`
        if ("minimum_rating" in queries && !/^\d+$/.test(queries.minimum_rating)) return res.status(400).send(Response(errors.ERR_MINR));
        const minimumRating = "minimum_rating" in queries ? parseInt(queries.minimum_rating, 10) : 0;
        if (minimumRating < 0 || minimumRating > 9) return res.status(400).send(Response(errors.ERR_MINR));

        // `query_term`
        const queryTerm = queries.query_term;

        // `genre`
        if (
            "genre" in queries &&
            (!/^(comedy|sci-fi|horror|romance|action|thriller|drama|mystery|crime|animation|adventure|fantasy|comedy-romance|action-comedy|superhero)(,(comedy|sci-fi|horror|romance|action|thriller|drama|mystery|crime|animation|adventure|fantasy|comedy-romance|action-comedy|superherocomedy|sci-fi|horror|romance|action|thriller|drama|mystery|crime|animation|adventure|fantasy|comedy-romance|action-comedy|superhero))*$/.test(
                queries.genre
            ) ||
                !/^(?!.*(comedy|sci-fi|horror|romance|action|thriller|drama|mystery|crime|animation|adventure|fantasy|comedy-romance|action-comedy|superhero).*\1.*).+$/.test(queries.genre))
        )
            return res.status(400).send(Response(errors.ERR_GNR));
        const genre = "genre" in queries ? queries.genre.split(",").filter(category => !!category) : undefined;

        // `sort_by`
        if ("sort_by" in queries && !/^(title|year|rating|peers|seeds|download_count|like_count|date_added)$/.test(queries.sort_by)) return res.status(400).send(Response(errors.ERR_SBY));
        const sortBy = "sort_by" in queries ? queries.sort_by : undefined;

        // `order_by`
        if ("order_by" in queries && !/^(asc|desc)$/.test(queries.order_by)) return res.status(400).send(Response(errors.ERR_OBY));
        const orderBy = "order_by" in queries ? queries.order_by : undefined;

        // `with_rt_ratings`
        if ("with_rt_ratings" in queries && !/^(false|true)$/.test(queries.with_rt_ratings)) return res.status(400).send(Response(errors.ERR_RTR));
        const withRtRatings = "with_rt_ratings" in queries ? queries.with_rt_ratings : undefined;

        const params = [
            `limit=${limit}`,
            `page=${page}`,
            quality ? `quality=${quality.join(",")}` : null,
            `minimum_rating=${minimumRating}`,
            queryTerm ? `query_term=${queryTerm}` : null,
            genre ? `genre=${genre.join(",")}` : null,
            sortBy ? `sort_by=${sortBy}` : null,
            orderBy ? `order_by=${orderBy}` : null,
            withRtRatings ? `with_rt_ratings=${withRtRatings}` : null,
        ]
            .filter(param => !!param)
            .join("&");
        req.ytsUrl = `${yts["yts.host"]}/api/v2/list_movies.json?${params}`;

        return next();
    } catch (error) {
        console.error("[yts.middleware]", error);
        return res.status(500).send(Response(String(error)));
    }
}

async function ytsMovieDetailsApiMiddleware(req, res, next) {
    try {
        const queries = req.query;

        // `movie_id`/`imdb_id`
        if (!("movie_id" in queries) && !("imdb_id" in queries)) return res.status(400).send(Response(errors.ERR_NOID));
        if (("movie_id" in queries && !/^\d+$/.test(queries.movie_id)) || ("imdb_id" in queries && !/^\d+$/.test(queries.imdb_id))) return res.status(400).send(Response(errors.ERR_INVID));
        const idType = "movie_id" in queries ? "movie_id" : "imdb_id";
        const id = idType === "movie_id" ? parseInt(queries.movie_id, 10) : parseInt(queries.imdb_id, 10);

        // `with_images`
        if ("with_images" in queries && !/^(false|true)$/.test(queries.with_images)) return res.status(500).send(Response(errors.ERR_WIE));
        const withImages = "with_images" in queries ? queries.with_images : undefined;

        // `with_cast`
        if ("with_cast" in queries && !/^(false|true)$/.test(queries.with_cast)) return res.status(500).send(Response(errors.ERR_WCE));
        const withCast = "with_cast" in queries ? queries.with_cast : undefined;

        const params = [`${idType}=${id}`, withImages ? `with_images=${withImages}` : null, withCast ? `with_cast=${withCast}` : null].filter(param => !!param).join("&");
        req.ytsUrl = `${yts["yts.host"]}/api/v2/movie_details.json?${params}`;

        return next();
    } catch (error) {
        console.error("[yts.middleware]", error);
        return res.status(500).send(Response(String(error)));
    }
}

module.exports = {
    ytsListMoviesApiMiddleware,
    ytsMovieDetailsApiMiddleware,
};
