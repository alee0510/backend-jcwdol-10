import { User } from "./user.js";
import { Profile } from "./profile.js"

// @define relation
User.hasOne(Profile, { foreignKey : "userId" })
Profile.belongsTo(User, { foreignKey : "userId" })

export { User, Profile }