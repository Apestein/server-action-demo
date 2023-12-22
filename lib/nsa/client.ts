import { createSafeActionClient } from "next-safe-action"

export const action = createSafeActionClient()

const getUserId = () => "foobar"

export const authAction = createSafeActionClient({
  async middleware(parsedInput) {
    const userId = getUserId()
    if (!userId) throw new Error("Unauthenticated")
    return { userId }
  },
})
