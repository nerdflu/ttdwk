import os, re, pathlib, yaml

ROOT = pathlib.Path(".")
CITIES_DIR = ROOT / "_cities"
CATS_FILE = ROOT / "_data" / "categories.yml"
OUT_DIR = ROOT / "category_pages"

def slugify(s):
    s = (s or "").strip().lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")

def read_categories(path):
    if not path.exists(): return []
    data = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(r"^\s*-\s*(.+?)\s*$", line)
            if m: data.append(slugify(m.group(1)))
    return data

def read_city_meta(fp):
    meta = {"slug":"", "title":"", "city_title":"", "preposition":"in"}
    text = fp.read_text(encoding="utf-8")
    m = re.search(r"^---\s*(.*?)\s*---", text, re.S | re.M)
    if m:
        fm = m.group(1)
        for k in ("slug","city_title","title","preposition"):
            mm = re.search(rf"^{k}:\s*(.+)$", fm, re.M)
            if mm: meta[k] = mm.group(1).strip()
    if not meta["slug"]: meta["slug"] = fp.stem
    if not meta["city_title"]: meta["city_title"] = meta.get("title") or meta["slug"].replace("-", " ").title()
    return meta

def cat_display(c): return c.replace("-", " ").title()

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    cats = read_categories(CATS_FILE)
    for cf in sorted(CITIES_DIR.glob("*.md")):
        city = read_city_meta(cf)
        for c in cats:
            city_slug = city["slug"]
            city_title = city["city_title"]
            prep = city.get("preposition","in")
            h1 = f"{cat_display(c)} things to do with kids {prep} {city_title}"
            title = h1
            out_dir = OUT_DIR / city_slug
            out_dir.mkdir(parents=True, exist_ok=True)
            out = out_dir / f"{c}.md"
            fm = [
                "---",
                "layout: city_category",
                f"title: {title}",
                f"permalink: /{city_slug}/{c}/",
                f"city_slug: {city_slug}",
                f"city_title: {city_title}",
                f"preposition: {prep}",
                f"category: {c}",
                f"h1: {h1}",
                "---",
                ""
            ]
            out.write_text("\n".join(fm), encoding="utf-8")
            print("Wrote", out)

if __name__ == "__main__":
    main()


