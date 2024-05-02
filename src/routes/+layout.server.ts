// This code was directly taken from https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit#create-a-project under the Apache 2.0 license

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession()

  return {
    session,
    user,
  }
}