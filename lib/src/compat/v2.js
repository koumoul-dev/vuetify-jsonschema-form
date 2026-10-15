/**
 * @file vjsf v2 compatibility layer — re-exported from json-layout.
 *
 * The implementation moved to `@json-layout/core/compat/v2`. It never depended on
 * anything in vjsf, and it had grown consumers that have no business depending on a Vue
 * component library to reach it. This entry point stays so `@koumoul/vjsf/compat/v2`
 * keeps working.
 */

export { v2compat } from '@json-layout/core/compat/v2'
