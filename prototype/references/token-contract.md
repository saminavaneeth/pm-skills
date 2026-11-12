# Token Contract and Brand Import

The kit never uses a raw color, size, or font name. It uses only the **contract tokens** below. A look is a `tokens.css` file that defines these names:

- the neutral default
- a wireframe look
- a company brand
- a new direction

Swap the file and the whole prototype changes.

## 1. The contract

**Required** tokens must be defined. **Derivable** tokens can be computed from others when the source has nothing equivalent (see section 4).

| Token | Role | Kit uses it for | |
|---|---|---|---|
| `--color-bg` | Page background | body, mobile frame | Required |
| `--color-surface` | Default container | cards, tables, inputs, topbar, sidebar | Required |
| `--color-surface-muted` | Subtle fill | table headers, hover rows, ghost hover | Derivable |
| `--color-surface-raised` | Floating layer | dialogs, toasts, menus | Derivable (= surface) |
| `--color-border` | Default divider and border | cards, tables, lists | Required |
| `--color-border-strong` | Control border | inputs, default buttons | Derivable |
| `--color-overlay` | Modal backdrop | dialog backdrop, loading | Derivable |
| `--color-text` | Primary text | body text, headings | Required |
| `--color-text-muted` | Secondary text | help text, labels, metadata | Required |
| `--color-primary` | Brand / main action | primary buttons, links, active nav, focus | Required |
| `--color-primary-hover` | Main action hover | primary button hover | Derivable |
| `--color-primary-subtle` | Tinted selection | active nav, info alert, primary badge | Derivable |
| `--color-on-primary` | Text on primary | primary button label | Required |
| `--color-focus` | Focus ring | all focusable elements | Derivable (= primary) |
| `--color-success` / `-subtle` | Positive status | badges, alerts, toasts | Required / Derivable |
| `--color-warning` / `-subtle` | Caution status | badges, alerts, toasts | Required / Derivable |
| `--color-danger` / `-subtle` | Error and destructive | danger button, errors, badges | Required / Derivable |
| `--color-on-danger` | Text on danger | danger button label | Derivable (= on-primary) |
| `--font-sans`, `--font-mono` | Font stacks | all text, code | Required / Derivable |
| `--text-xs` … `--text-2xl` | Type scale (6 steps) | all text | Required |
| `--leading-tight`, `--leading-normal` | Line heights | headings, body | Derivable (1.25 / 1.5) |
| `--weight-regular`, `-medium`, `-bold` | Font weights | body, labels, headings | Derivable (400/500/600) |
| `--space-1` … `--space-8` | Spacing scale (4, 8, 12, 16, 24, 32, 48, 64 by default) | all padding and gaps | Required |
| `--radius-sm`, `-md`, `-lg`, `-full` | Corner radius | badges, controls, cards, pills | Required |
| `--shadow-sm`, `-md`, `-lg` | Elevation | cards, hover, dialogs | Derivable |
| `--control-height` | Button and input height (sets density) | buttons, inputs | Derivable (36px) |
| `--sidebar-width`, `--content-max-width` | Layout | app shell | Derivable |
| `--duration-fast`, `--easing` | Motion | transitions | Derivable |
| `--has-dark-theme` | `1` if `[data-theme="dark"]` values exist | toolbar shows the Dark toggle | Optional |

Dark values go in `:root[data-theme="dark"] { … }` and redefine the color tokens (and shadows if needed).

## 2. Brand file format

Keep the source tokens **verbatim**, then map the contract onto them with `var()`. That keeps each mapping traceable, and lets you update the brand by re-importing the source block.

```css
/*
 * Brand: Acme
 * Source: Figma variables, file "Acme DS", collections "Primitives" + "Semantic", modes Light/Dark
 * Imported: 2026-11-11 by the prototype skill. Mapping details: brand.md
 */
:root {
  /* ---------- Source tokens (verbatim; prefixed --ds- only on name collisions) ---------- */
  --acme-blue-600: #2453d4;
  --acme-blue-700: #1c43ad;
  --acme-color-bg-canvas: #f7f8fa;
  --acme-color-text-default: #101828;
  /* … */

  /* ---------- Kit contract ---------- */
  --has-dark-theme: 1;
  --color-bg: var(--acme-color-bg-canvas);
  --color-text: var(--acme-color-text-default);
  --color-primary: var(--acme-blue-600);
  --color-primary-hover: var(--acme-blue-700);
  --color-primary-subtle: color-mix(in srgb, var(--color-primary) 12%, var(--color-surface)); /* derived */
  /* … every contract token … */
}
:root[data-theme="dark"] {
  --acme-color-bg-canvas: #0c111d;
  /* … dark values of the source tokens; contract aliases follow automatically … */
}
```

## 3. Importing from CSS variables

1. **Find the source.** Possible places:
   - a design-system package or stylesheet the PM points to
   - the product codebase: search for `:root {` and `--` definitions in global CSS, theme files, or `tokens.css`, `variables.css`, `theme.css`
   - built CSS from the live product, which the PM can save from the browser
2. **Find the themes.** Dark or other themes usually live under one of: `[data-theme="dark"]`, `.dark`, `.theme-dark`, or `@media (prefers-color-scheme: dark)`. Map them to `:root[data-theme="dark"]`.
3. **Separate the layers.** Primitives describe *what a value is* (`--blue-600`, `--gray-100`, `--space-4`). Semantic tokens describe *what it's for* (`--color-text-primary`, `--surface-card`). **Map the contract to the semantic layer.** Fall back to primitives only when no semantic token exists, and flag that.
4. **Resolve preprocessor syntax.** Values in SCSS or Less variables (`$blue-600`), or in Tailwind config, must be resolved to real values first.
5. Copy the source definitions verbatim, map the contract (section 5), preview, and confirm.

## 4. Importing from Figma variables

**Getting the variables** (best option first):

1. **The Figma MCP server**, if it's connected in this session. Use its variable or design-token tool on the design-system file, or on a representative frame (Figma's Dev Mode MCP server calls it `get_variable_defs`). If the server is installed but not authorized, tell the PM it needs authorizing. Don't ask for tokens or codes.
2. **A JSON export the PM provides**, in one of these formats:
   - **W3C DTCG format**, from many export plugins and Style Dictionary: `{"color": {"primary": {"$type": "color", "$value": "#2453D4"}}}`, with aliases written as `"{color.blue.600}"`.
   - **Tokens Studio format**: like DTCG but with `value` and `type` (no `$`), often one set per theme.
   - **Figma REST API**, `GET /v1/files/:key/variables/local` (Enterprise plans). It returns `variables` (each with `name` like `color/primary`, `resolvedType`, and `valuesByMode`) and `variableCollections` (with `modes: [{modeId, name}]`). Colors arrive as `{r, g, b, a}` floats from 0–1, so multiply by 255. Aliases arrive as `{"type": "VARIABLE_ALIAS", "id": "…"}`, which you resolve by id.
3. **Last resort**: screenshots of, or text pasted from, Figma's Variables panel. Transcribe them and mark the brand as `manual import`, which means lower confidence.

**Converting:**

- **Names.** `color/text/primary` → `--color-text-primary`: lowercase, `/` and spaces become `-`. Keep the collection as a prefix if names would collide (`--semantic-color-text-primary`).
- **Types.**
  - `COLOR` → hex, or `rgba()` when alpha < 1.
  - `FLOAT` → `px` for spacing, radius, size, or font size, decided by the variable's name or scopes. Unitless for line height, weight, or opacity.
  - `STRING` → font family (quote it, and add a fallback stack).
- **Aliases.** Keep them as `var()` references, so semantic tokens point to primitives.
- **Modes.** Light → `:root`, Dark → `:root[data-theme="dark"]`. For other modes (brands, density, platforms), ask which one to use, or create one look file per mode and register them with `data-looks`.
- **Typography.** Figma **text styles** are not variables. If type exists only as styles, read the styles through the MCP server or ask for them. Otherwise map the closest values and flag it.
- **Fonts.**
  - If the brand font isn't installed and isn't freely available on the web, use the closest system stack and note it.
  - Never copy licensed font files into a prototype without the PM confirming the license.
  - A Google Fonts `<link>` is fine if the PM accepts that the prototype makes a network request.

## 5. Mapping heuristics

| Contract token | Look for source names containing |
|---|---|
| `--color-bg` | background, bg, canvas, page, base |
| `--color-surface` | surface, card, container, panel, elevation-0, bg-default |
| `--color-surface-muted` | subtle, secondary, muted, sunken, bg-muted, neutral-100 |
| `--color-surface-raised` | raised, elevated, overlay-surface, popover, modal |
| `--color-border` | border, stroke, outline, divider, separator (default or subtle) |
| `--color-border-strong` | border strong, border input, control border, emphasis |
| `--color-text` | text, foreground, fg, content, on-surface, text-default, primary text |
| `--color-text-muted` | secondary, subtle, muted, tertiary, placeholder (choose the one that passes contrast) |
| `--color-primary` | primary, brand, accent, action, interactive, cta |
| `--color-primary-hover` | primary hover, brand pressed, action-hover |
| `--color-on-primary` | on-primary, text-on-brand, inverse, on-accent |
| `--color-focus` | focus, ring, focus-ring |
| `--color-success` / `warning` / `danger` | success or positive · warning or caution · danger, error, negative, critical |

For each contract token, record the source token, the value, and a **confidence** (High = semantic name match, Medium = primitive or inferred, Low = guessed or derived) in `brand.md`.

**Deriving missing tokens** (mark each one `/* derived */`):

```css
--color-surface-muted:  color-mix(in srgb, var(--color-text) 5%, var(--color-surface));
--color-border-strong:  color-mix(in srgb, var(--color-text) 25%, var(--color-surface));
--color-primary-hover:  color-mix(in srgb, var(--color-primary) 85%, black);
--color-primary-subtle: color-mix(in srgb, var(--color-primary) 12%, var(--color-surface));
--color-success-subtle: color-mix(in srgb, var(--color-success) 12%, var(--color-surface));
--color-overlay:        rgba(0, 0, 0, 0.45);
```

## 6. Confirm before building

1. Write the brand `tokens.css`, copy `kit/tokens-preview.html` next to it, and ask the PM to open it.
2. Report the contrast failures from the preview's contrast table yourself, by computing the ratios from the values: text pairs need 4.5:1 or more, and large text and UI elements need 3:1. **Don't silently "fix" a brand color.** Flag it, and suggest a compliant alternative for the prototype only if the PM wants one.
3. Ask one question: the mapping looks right? List the **Low** and **Medium** confidence mappings, and recommend a choice for each.

## 7. Saving and reusing brands

```
<brands folder>/<brand-slug>/
  tokens.css      # the brand look (sections 2–5)
  brand.md        # source, import date, mapping table with confidence, derived tokens, font notes, contrast results
  logo.svg        # optional
  fonts/          # optional, only with a confirmed license
```

**Where brands are found** (first match wins):

1. a path the PM gives
2. the project's `.claude/prototype-brands/`, committed to the repo, for brands a team shares
3. the user-level `~/.claude/prototype-brands/` (on Windows, `%USERPROFILE%\.claude\prototype-brands\`)

After an import, ask where to save it. **Recommend user level**, unless the PM wants the team to share it through the repo.

**Updating a brand.** Re-import the source block, keep the contract mapping, show the PM a short diff of changed values, and update `brand.md`. Prototypes keep their own copy of `tokens.css`, so old prototypes don't change unless the PM asks.

## 8. Creating a new look

When the PM wants a different design (a new product, a rebrand, an exploration), start from a short brief: product personality in 3 words, any fixed brand color, the audience, and how dense the UI should be. Then vary four levers:

| Lever | Tokens | Options |
|---|---|---|
| **Color** | primary hue, neutral temperature (cool or warm grays), surface contrast | one brand hue + neutrals; keep status colors conventional |
| **Shape** | `--radius-*`, `--shadow-*` | sharp (2/3/4px, flat) · soft (6/8/12px, light shadow) · round (10/14/20px, pill buttons) |
| **Density** | `--control-height`, `--space-*`, `--text-md` | compact (32px, 13px) · regular (36px, 14px) · comfortable (44px, 16px) |
| **Type** | `--font-sans`, weights, scale ratio | system stack · humanist · geometric · serif headings via a Google Font (with PM approval) |

- For **directions**, write 2–3 files (`tokens-calm.css`, `tokens-bold.css`, …) that differ deliberately on at least two levers, each with a one-line rationale in its header.
- Register them with `<body data-looks="Calm:tokens-calm.css,Bold:tokens-bold.css">` so the PM can switch between them in the prototype.
- Every direction must pass AA contrast for text.
- The chosen direction can be saved as a brand.
