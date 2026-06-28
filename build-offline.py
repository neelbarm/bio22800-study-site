#!/usr/bin/env python3
"""Build a single self-contained offline HTML for BIO 22800.

Inlines course-data.js and every referenced slide image (as base64 data URIs)
into one file: bio22800-offline.html. The result needs no folder structure,
no server, and no internet — open it in any browser (e.g. on a flight).

Usage: python3 build-offline.py
"""
import base64
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "bio22800-offline.html")
SLIDE_RE = re.compile(r"slides/L\d+/slide-\d+\.jpg")


def main():
    idx = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()
    data = open(os.path.join(HERE, "course-data.js"), encoding="utf-8").read()

    paths = sorted(set(SLIDE_RE.findall(idx + data)))
    uris = {}
    for p in paths:
        with open(os.path.join(HERE, p), "rb") as f:
            uris[p] = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("ascii")

    # Replace longest paths first so no path is a prefix of another.
    for p in sorted(paths, key=len, reverse=True):
        data = data.replace(p, uris[p])
        idx = idx.replace(p, uris[p])

    tag = '<script src="course-data.js"></script>'
    if tag not in idx:
        raise SystemExit("could not find the course-data.js script tag in index.html")
    idx = idx.replace(tag, "<script>\n" + data + "\n</script>")

    # No real (digit-bearing) slide reference or external data file should remain.
    if SLIDE_RE.search(idx):
        raise SystemExit("a slide reference was left un-inlined")
    if 'src="course-data.js"' in idx:
        raise SystemExit("the external data reference was left in place")

    with open(OUT, "w", encoding="utf-8") as f:
        f.write(idx)
    print("Wrote %s (%.1f MB), %d slides inlined." % (OUT, os.path.getsize(OUT) / 1e6, len(paths)))


if __name__ == "__main__":
    main()
