import { User } from "src/types/types"

declare module 'express-session' {
    interface SessionData {
        user?: User
    }
}

/* to make this file not be treated as a script but module */
/* typescript defined file without import/export will be treated as a script */
export {}