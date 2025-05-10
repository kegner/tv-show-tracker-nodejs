CREATE TABLE public.shows (
    id uuid DEFAULT gen_random_uuid(),
    end_date date,
    platform character varying(255),
    score double precision,
    season integer,
    series_status character varying(255),
    start_date date,
    title character varying(255),
    watch_status character varying(255)
);

ALTER TABLE public.shows OWNER TO postgres;
ALTER TABLE public.shows ADD UNIQUE (title, season);