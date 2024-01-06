import musicbrainzngs
from strictyaml import NullNone, Map, Str, Int, Seq, as_document

mbid = "bad1bcf5-a98e-471c-b553-53d196e5a868"

musicbrainzngs.set_useragent(
    "dominic's personal site", "0.2", "https://dominicmkennedy.com/music"
)
res = musicbrainzngs.get_release_by_id(mbid, includes=["recordings", "artist-credits"])

tracks = [
    {
        "name": x["recording"]["title"],
        "mbid": x["id"],
        "trackNumber": int(x["position"]),
        "duration": int(x["length"]),
        "trackRank": None,
        "trackScore": None,
    }
    for x in res["release"]["medium-list"][0]["track-list"]
]


album_data = {
    "title": res["release"]["title"],
    "mbid": res["release"]["id"],
    "credits": ", ".join(
        [x["artist"]["name"] for x in res["release"]["artist-credit"]]
    ),
    "albumRelease": res["release"]["date"],
    "duration": sum([x["duration"] for x in tracks]),
    "reviewDate": None,
    "score": None,
    "tracks": tracks,
}

track_schema = Map(
    {
        "name": Str(),
        "mbid": Str(),
        "trackNumber": Int(),
        "duration": Int(),
        "trackRank": NullNone(),
        "trackScore": NullNone(),
    }
)

schema = Map(
    {
        "title": Str(),
        "mbid": Str(),
        "credits": Str(),
        "albumRelease": Str(),
        "duration": Int(),
        "reviewDate": NullNone(),
        "score": NullNone(),
        "tracks": Seq(track_schema),
    }
)

yaml: str = as_document(album_data, schema).as_yaml()
md_str = (
    f"---\n{yaml.strip()}\n---"
    + """
# *{title}* by {credits}

Review forthcoming. Check back next Monday!
"""
)

print(md_str)
