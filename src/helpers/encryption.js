import bycript from "bcrypt"

export function hashPassword(password) {
    return bycript.hashSync(password, 10);
}

export function comparePassword(password, hash) {
    return bycript.compareSync(password, hash);
}