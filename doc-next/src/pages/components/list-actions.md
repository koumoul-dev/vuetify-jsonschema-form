---
title: List actions
description: The listActions catalogue — add, edit, delete, sort, duplicate, insertAfter, copy/paste — their context-dependent defaults, and confirmDeleteItem
nav:
  order: 31
  subsection: Lists
---

# List actions

`layout.listActions` is the array of action names available on a
[list](/components/lists) (an array, or a `patternProperties` indexed
object). Each action shows up either as a top-level control (`add`, and
`paste` once something has been copied) or as an entry in a per-item
menu:

| Action | Effect |
| --- | --- |
| `add` | Appends a new (empty) item. |
| `edit` | Lets an item be edited — meaningless (and hidden) when `listEditMode` is `inline`, since every item is already editable there. |
| `delete` | Removes an item, behind a confirmation step unless `confirmDeleteItem: false` (see below). |
| `sort` | Drag-and-drop reordering (via a drag handle), plus "Move up" / "Move down" menu entries. |
| `duplicate` | Inserts a copy of the item right after itself; see `itemCopy` below. |
| `insertAfter` | Inserts a new empty item right after this one, instead of only at the end via `add`. |
| `copy` / `paste` | Copies an item's data to a clipboard, shared by every list using the same `clipboardKey` (see below); `paste` appends the clipboard's content as a new item. |

## Default actions

Left unset, `listActions` defaults to `["add", "edit", "delete", "sort",
"duplicate"]` for a plain array — no `copy`/`paste` (those need an
explicit `clipboardKey`, see below):

<VjsfDemo demo="demo-list-actions/defaults" expanded />

## sort

Hover a row to reveal its drag handle, or open its menu for explicit
"Move up" / "Move down" entries (the `up`/`down` [messages](/behavior/i18n#overriding)):

<VjsfDemo demo="demo-list-actions/sort" expanded />

## duplicate + itemCopy

By default, `duplicate` clones the item's data verbatim. `layout.itemCopy`
is an [expression](/behavior/expressions) that computes the copy's data
instead — here it's used to tweak the duplicated contact's name so the
two are told apart:

<VjsfDemo demo="demo-list-actions/duplicate" expanded />

`itemCopy` also runs on `paste` (see below), so a pasted item goes
through the same transform as a duplicated one.

## insertAfter

Unlike `add` (always appends at the end), `insertAfter` inserts the new
empty item right after the one whose menu it was opened from:

<VjsfDemo demo="demo-list-actions/insert-after" expanded />

## copy / paste and clipboardKey

`copy` stores an item's data; `paste` appends it to another list. The
clipboard is keyed by `layout.clipboardKey` (falling back to the list's
own full key when unset), so two lists sharing the same `clipboardKey`
share the same clipboard — copy an entry from Team A below, then paste
it into Team B:

<VjsfDemo demo="demo-list-actions/copy-paste" expanded />

The shared clipboard only works between lists that live in the *same*
rendered form (they need a common ancestor providing it) — two entirely
separate `<Vjsf>` instances on a page (e.g. two independent demos) do
not share one, even with an identical `clipboardKey`.

## confirmDeleteItem

`delete` normally asks for confirmation (a "Confirm" button appears in
place of the menu). Setting the root `confirmDeleteItem` option to
`false` makes it delete immediately instead:

<VjsfDemo demo="demo-list-actions/confirm-delete-false" expanded />

## Context-dependent defaults

`listActions` is only defaulted when left unset — and the default itself
depends on how the list is set up:

- **`patternProperties` indexed object** — `["add", "edit", "delete"]`,
  regardless of the pattern's item type (no `sort`/`duplicate`: there's
  no natural position or generic key to copy).
- **Plain array with a list-level `layout.getItems`** — `["edit"]` only:
  items are expected to come from picking values, not from typing them
  in, so `add`/`delete` aren't defaulted in.
- **Plain array with `layout.clipboardKey` set** — `["add", "edit",
  "delete", "sort", "duplicate", "copy", "paste"]`: setting a
  `clipboardKey` is taken as an explicit signal that copy/paste should be
  available.
- **Plain array, no `clipboardKey`, no `getItems`** (the common case) —
  `["add", "edit", "delete", "sort", "duplicate"]`, as shown in the
  defaults demo at the top of this page.

## Related

- [Lists](/components/lists) — `listEditMode`, its own defaulting rule,
  `listMenuWidth`/`listDialogWidth`, tuples, and `patternProperties`.
- [Internationalization](/behavior/i18n#overriding) — overriding the
  `addItem`, `edit`, `delete`, `duplicate`, `insertAfter`, `sort`, `up`,
  `down`, `copy` and `paste` messages.
- [Expressions](/behavior/expressions) — the expression types (`js-eval`,
  `js-tpl`, `js-fn`) and parameters used by `itemCopy`, `itemTitle` and
  `itemSubtitle`.
