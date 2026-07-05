# Doc backlog from issue mining

Result of a sweep of all GitHub issues (open & closed) of this repo and of the
internal Koumoul GitLab (2026-07-05), looking for documentation complaints and
for complex behaviors that were answered in tickets and deserve proper doc
coverage. Already handled in the doc (not listed below): [#462](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/462)
(scope of `layout.options`), [#435](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/435)
(`removeAdditional`), [#487](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/487)
(label provenance), [#463](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/463)
(`fetch`/`fetchOptions`), [plateforme#1697](https://gitlab.com/koumoul/plateforme/-/issues/1697)
(`layout.step`), plugins-vs-slots doctrine.

## behavior/validation

- **Server-side errors** — no built-in support; answered patterns: impure
  `layout.getProps` filling `errorMessages` from `options.context`, or alerts
  outside the form. [#501](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/501),
  [#65](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/65),
  [plateforme#1280](https://gitlab.com/koumoul/plateforme/-/issues/1280)
- **Vuetify rules vs ajv** — vjsf hands an *empty* VForm to its children (cache
  preservation), so custom Vuetify rules don't bubble up; the supported way is
  user-defined ajv keywords (`ajvOptions`/custom ajv instance) + `errorMessage`.
  `getProps` is under-documented per the maintainer.
  [#544](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/544),
  [#530](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/530)
- **Empty values are stripped** — "non-required empty values are processed as
  undefined"; workarounds `required` or `default: []`. Recurring surprise.
  [#514](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/514),
  [#517](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/517)
- **Nullable pattern** — `anyOf`/`oneOf` of `[type, "null"]` makes a property
  nullable; supported, undocumented. [#479](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/479)
- **Supported JSON Schema drafts** — core runs Ajv in 2019-09 mode; a
  `$schema` 2020-12 (e.g. zod output) breaks the compiler; workaround = strip
  `$schema`. [#505](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/505)
- **Custom ajv instance / `$data`** — how to tune `ajvOptions` (e.g. password
  confirmation via `$data`). [#367](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/367)
- **`dependentRequired`/`dependentSchemas`, if/then/else** — clarify what is
  validated vs what drives rendering.
  [#290](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/290),
  [#357](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/357)
- **Per-section/step validation (wizard)** — not supported; worth stating.
  [#204](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/204)
- **Prefilled form cannot be submitted** — change detection / initial emission
  behavior when the whole config is prefilled; still open internally.
  [plateforme#1076](https://gitlab.com/koumoul/plateforme/-/issues/1076)

## behavior/options

- **Props cascade & inoperative props** — some Vuetify props are overridden by
  vjsf's own slots/props on the underlying component; document the boundary
  (normalized layout keys vs `layout.props` passthrough vs reserved).
  [#281](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/281)
- **Defaults applied by vjsf and how to cancel them** (concept dates back to
  v2 `textareaProps: {filled: true}`). [#226](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/226)
- **Hidden-but-present fields** — the v2 `x-display: hidden` concept (field in
  the model, not rendered); document the v3 equivalent.
  [#8](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/8)

## components/combined-schemas (oneOf)

- **`oneOfLayout.label` + `emptyData`** — labels for the oneOf selector, and
  `emptyData: true` to clear fields on type change and avoid "must NOT have
  unevaluated properties". [sankey#14](https://gitlab.com/koumoul/common-applications/data-fair-sankey/-/issues/14),
  [plateforme#1698](https://gitlab.com/koumoul/plateforme/-/issues/1698)
- **Data of the abandoned sub-schema is cleaned** — deliberate design choice.
  [#121](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/121)
- **Active sub-schema detection / discriminator** — how vjsf picks the current
  oneOf branch from data. [#472](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/472),
  [#544](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/544)

## behavior/dynamic-data

- **Dependent selects** — cascade via `${parent.data...}` in the URL, and the
  documented-nowhere behavior that the child value is NOT reset when the
  parent changes ("existing data is not removed when it is not found in the
  fetched items"). [#516](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/516),
  [#375](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/375)
- **`getItems` error behavior** (loading bar, error surfacing).
  [plateforme#1557](https://gitlab.com/koumoul/plateforme/-/issues/1557)

## behavior/expressions

- **Diagnosing "failed to evaluate expression"** — long `parent.parent...`
  chains break silently when the schema moves; how to debug.
  [carto-stats#49](https://gitlab.com/koumoul/common-applications/carto-stats/-/issues/49)
- **Computed/derived fields are not supported** (beyond `getDefaultData`) —
  state the limit and the external-watch pattern.
  [#518](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/518),
  [#348](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/348)
- **Complex logic → functions exposed in `options.context`** rather than long
  expressions. [#322](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/322)

## components/lists

- **`editMode` (dialog/menu editing)** — implemented after the request; known
  rough edges (padding, required errors not showing in dialog mode). Issue
  still open. [#495](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/495)
- **Shared clipboard** — `createClipboard()` from
  `@koumoul/vjsf/composables/use-clipboard.js` + `layout.clipboardKey`.
  [#510](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/510)
- **`itemTitle`/`itemSubtitle` + `summary`** for compact/detailed list items —
  maintainer: "the example based documentation on the list component is not
  very complete". [#488](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/488)
- **Simple-type arrays as combobox** — users don't discover Enter-to-add.
  [plateforme#688](https://gitlab.com/koumoul/plateforme/-/issues/688)
- **List scroll bug (v3)** — reported against the doc's lists page, no
  diagnosis yet. [plateforme#1701](https://gitlab.com/koumoul/plateforme/-/issues/1701)

## components (misc)

- **TimePicker 24h format** — via Vuetify defaults-provider integration.
  [#480](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/480)
- **Dates & timezones** — off-by-one-day and DST pitfalls.
  [#507](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/507),
  [#532](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/532)
- **Editable `additionalProperties` (key/value pairs)** — wished by the
  maintainer in the issue; check current support before documenting.
  [#424](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/424)
- **Long item text: select vs autocomplete truncation.**
  [plateforme#1557](https://gitlab.com/koumoul/plateforme/-/issues/1557)

## behavior/i18n

- **Real-world `xI18n` / `x-i18n-title` example** (data-fair webhooks settings).
  [plateforme#1744](https://gitlab.com/koumoul/plateforme/-/issues/1744)
- **Translating schemas vs editing multilingual data** (`~$locale~` in `$ref`
  vs per-language data objects via slots).
  [#81](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/81),
  [#272](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/272)

## introduction/getting-started (troubleshooting)

- **CJS deps diagnosis** — `npm ls ajv-formats`, npm 9 nesting vs npm 10,
  webpack "Default condition should be last one".
  [#446](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/446),
  [#440](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/440),
  [#461](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/461),
  [#422](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/422)
- **SSR/Nuxt imports.** [#305](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/305),
  [#470](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/470),
  [#492](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/492)
- **Model mutation contract** — vjsf emits copies, never mutates the model;
  state it explicitly. [#200](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/200)

## behavior/compilation

- **External `$ref`s are not resolved** (only local ones).
  [#421](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/421)
- **Large forms performance** — angle: build-time compilation + `updateOn` +
  splitting. [#371](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/371)

## migration

- **`rootDisplay` is gone** (a warning was added to v2-compat examples) and
  Vuetify 4 visual pitfalls.
  [plateforme#1505](https://gitlab.com/koumoul/plateforme/-/issues/1505),
  [plateforme#1696](https://gitlab.com/koumoul/plateforme/-/issues/1696)
- **`x-directives` used the app's own directives** (doc never said it).
  [#426](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/426)
- **Optional objects with required fields** — long-standing v2 issue, fixed by
  design in v3; worth a migration note.
  [#431](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/431)

## editor

- **Not a form builder** — recurring expectation of a drag-and-drop schema
  builder; state upfront that the editor is a schema/form sandbox.
  [#587](https://github.com/koumoul-dev/vuetify-jsonschema-form/issues/587)

## new page

- **WebMCP** — the `webmcp` compiler option and the `@koumoul/vjsf/webmcp`
  runtime variant are documented nowhere beyond a mention on the compilation
  page; deserves a dedicated page.
  [plateforme#1680](https://gitlab.com/koumoul/plateforme/-/issues/1680)
