// Static declaration of the drawer structure: group order, display titles and
// icons are not derivable from the pages directory, so they live here.
// A page's group is its directory under src/pages (see build-nav.ts).
export interface NavGroupConfig { dir: string, title: string, icon: string }

export const navGroups: NavGroupConfig[] = [
  { dir: 'introduction', title: 'Introduction', icon: 'mdi-script-text-outline' },
  { dir: 'behavior', title: 'Behavior', icon: 'mdi-cog-outline' },
  { dir: 'components', title: 'Components', icon: 'mdi-view-dashboard-outline' },
  { dir: 'plugins', title: 'Plugins', icon: 'mdi-power-plug-outline' },
  { dir: 'migration', title: 'Migration & Compat', icon: 'mdi-swap-horizontal' },
]

// Items rendered above the groups, outside any of them.
export const standaloneItems = [
  { title: 'Playground', to: '/editor', icon: 'mdi-play', order: 0 },
]

// The homepage is src/pages/index.vue (no markdown frontmatter), so its nav
// entry is declared statically; it sorts first inside Introduction.
export const staticGroupItems: Record<string, { title: string, to: string, order: number }[]> = {
  introduction: [{ title: 'Home', to: '/', order: 0 }],
}
