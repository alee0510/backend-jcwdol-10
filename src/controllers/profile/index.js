import { Profile } from "../../models/user.js";

// @upload image
export const uploadImage = async (req, res, next) => {
    try {
        // @check if image is uploaded
        if (!req.file) {
            throw new ({ status: 400, message: "Please upload an image." })
        }

        console.log(req.file)

        // @TODO: delete the old image

        // @update the user profile
        await Profile?.update({ image : req?.file?.path }, { where : { id : req.user.id } })

        // @send response
        res.status(200).json({ message : "Image uploaded successfully.", imageUrl : req.file?.path })
    } catch (error) {
        next(error)
    }
}

// @get user profile
export const getProfile = async (req, res, next) => {
    try {
        // @get the user profile
        const profile = await Profile.findOne({ where : { id : req.user.id } })

        // @send response
        res.status(200).json({ profile })
    } catch (error) {
        next(error)
    }
}

// @TODO : update user profile