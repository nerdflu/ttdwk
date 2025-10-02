import re, pathlib

ROOT = pathlib.Path(".")
CITIES_DIR = ROOT / "_cities"
CATS_FILE = ROOT / "_data" / "categories.yml"
OUT_DIR = ROOT / "category_pages"
ACTIVITIES_DIR = ROOT / "_activities"

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

def read_activity_city_categories(path):
    city_cats = {}
    if not path.exists():
        return city_cats
    for fp in path.glob("*.md"):
        text = fp.read_text(encoding="utf-8")
        m = re.search(r"^---\s*(.*?)\s*---", text, re.S | re.M)
        if not m:
            continue
        fm = m.group(1)
        city = None
        categories = []
        collecting_categories = False
        for line in fm.splitlines():
            stripped = line.strip()
            if not stripped:
                if collecting_categories:
                    break
                continue
            if stripped.startswith("city:"):
                city = slugify(stripped.split(":", 1)[1])
                collecting_categories = False
                continue
            if stripped.startswith("categories:"):
                raw = stripped.split(":", 1)[1].strip()
                if raw.startswith("[") and raw.endswith("]"):
                    raw = raw[1:-1]
                if raw:
                    categories = [slugify(part) for part in raw.split(",") if part.strip()]
                    collecting_categories = False
                else:
                    categories = []
                    collecting_categories = True
                continue
            if collecting_categories:
                if stripped.startswith("-"):
                    item = stripped.lstrip("-").strip()
                    if item:
                        categories.append(slugify(item))
                elif re.match(r"^[\w-]+:", stripped):
                    collecting_categories = False
                continue
        if city and categories:
            city_cats.setdefault(city, set()).update(categories)
    return city_cats

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
    city_categories = read_activity_city_categories(ACTIVITIES_DIR)
    desired = set()
    for cf in sorted(CITIES_DIR.glob("*.md")):
        city = read_city_meta(cf)
        city_slug = city["slug"]
        city_title = city["city_title"]
        prep = city.get("preposition","in")
        allowed_categories = city_categories.get(city_slug, set())
        if not allowed_categories:
            continue
        for c in cats:
            if c not in allowed_categories:
                continue
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
            content = "\n".join(fm)
            if out.exists() and out.read_text(encoding="utf-8") == content:
                print("Unchanged", out)
            else:
                out.write_text(content, encoding="utf-8")
                print("Wrote", out)
            desired.add((city_slug, c))

    prune_unused(desired)

def prune_unused(desired):
    if not OUT_DIR.exists():
        return
    for city_dir in list(OUT_DIR.iterdir()):
        if not city_dir.is_dir():
            continue
        for md in list(city_dir.glob("*.md")):
            combo = (city_dir.name, md.stem)
            if combo not in desired:
                md.unlink()
                print("Removed", md)
        if not any(city_dir.iterdir()):
            city_dir.rmdir()
            print("Removed empty directory", city_dir)
    if not any(OUT_DIR.iterdir()):
        OUT_DIR.rmdir()

if __name__ == "__main__":
    main()


