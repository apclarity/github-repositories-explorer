import {z} from "zod";

export const usernameRepoSchema = z.object({
    username: z
    .string()
    .min(3, {message: 'Username must be at least 3 characters long'})
    .max(39, { message: 'Username must be at most 39 characters' })
    .nonempty({message: 'Please enter a Github username'})
    .regex(
        /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/,
        {
            message:
            'Username must be alphanumeric or hyphen, cannot start or end with hyphen, or contain consecutive hyphens',
        }
    )
})

export type UsernameRepoSchema = z.infer<typeof usernameRepoSchema>