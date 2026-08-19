# Updating the site's content

Everything you see on the website lives in the JSON files in this folder.
You never need to touch code for normal updates.

## Which file do I edit?

| I want to…              | I edit…            | Images go in… |
| ----------------------- | ------------------ | ------------- |
| Add / edit a person     | `people.json`      | `public/images/people/` |
| Add a blog post         | `blogs.json`       | `public/images/blog/` |
| Add a publication       | `publications.json`| — |
| Add a research project  | `projects.json`    | `public/images/research/` |
| Change contact / email / socials / partner logos | `lab.json` | `public/images/affiliations/` |

After editing, run **`npm run check`** — it tells you exactly what's missing
or wrong, and it also checks that every image you referenced actually exists.
It runs automatically before every `npm run build`.

## The golden rules

- Every record needs an `id`. Make it unique and readable: `"dd-3"`, `"blog-2"`.
- Image paths always start with `/` and point at a file in `public/`,
  e.g. `"/images/people/Ashwin.jpg"`.
- If a field is optional, you can leave it out or use an empty `{}` (e.g. `"links": {}`).
- Don't delete or rename the fields shown in the examples — the site depends on them.

## people.json

Three lists: `faculty` (the PI), `members` (everyone else), `alumni` (leave empty for now).

A member looks like this:

```json
{
  "id": "ms-3",
  "name": "Ashwin Rao",
  "photo": "/images/people/Ashwin.jpg",
  "photoPosition": "50% 40%",
  "role": "MS Student",
  "degree": "MS",
  "program": "MS",
  "yearJoined": 2025,
  "researchDomains": ["In-Memory Computing", "RISC-V"],
  "links": {
    "email": "ashwin.rao@research.iiit.ac.in",
    "linkedin": "https://www.linkedin.com/in/...",
    "github": "https://github.com/..."
  }
}
```

Field notes:

- `photoPosition` controls how the photo is cropped. Start with `"50% 40%"` and
  nudge the two numbers left/right, up/down if the face is off-center.
- `degree` powers the "filter by degree" tabs: use one of `PhD`, `MS`, `BTech/DD`,
  `Research Assistant`.
- `researchDomains` powers the "filter by research domain" tabs.
- `links` is optional — but add at least an `email`.

## blogs.json

One entry per post. `date` must be `YYYY-MM-DD`. `link` is where the full post
lives (usually an IIITH blog URL).

## publications.json

One entry per paper. `type` is one of `journal`, `conference`, `preprint`, `workshop`.
`links` is optional but please include at least one of `doi`, `arxiv`, `pdf`, `code`.
The site groups papers by `year` automatically — just put the right year on each.

## projects.json

One entry per research project. `status` is `active` or `completed`.
The homepage shows the first 4, the Research page shows all `active` ones.

## lab.json

Lab-level info:

- `mission`, `fullName` — shown on the homepage.
- `heroImages` — the homepage hero images. They cycle vertically when the hero is hovered.
  The current entries are placeholders; replace them with lab images as they become available.
- `contact` — email and address used in the People page and footer.
- `socialLinks` — external profiles (currently referenced by other tools).
- `affiliations` — the partner logos on the homepage ("Our Affiliations & Partners").
  Add or remove entries here; the grid auto-fits up to 4 per row.
