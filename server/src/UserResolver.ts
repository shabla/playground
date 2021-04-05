import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { User } from "./entity/User";
import { hash, compare } from "bcryptjs";

import { setRefreshTokenCookie, createAccessToken, createRefreshToken, revokeRefreshToken } from "./tokens";
import { QueryContext } from "./QueryContext";
import { isAuth } from "./middlewares/isAuthenticated";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @UseMiddleware(isAuth)
    @Query(() => [User])
    async users() {
        return await User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: QueryContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("user does not exist");
        }

        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error("invalid password");
        }

        // Login successful
        setRefreshTokenCookie(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
        };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res, payload }: QueryContext): Promise<boolean> {
        res.clearCookie("jid");

        if(payload && payload.userId) {
            await revokeRefreshToken(payload.userId);
        }

        return true;
    }

    @Mutation(() => Boolean)
    async register(@Arg("email") email: string, @Arg("password") password: string) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({ email, password: hashedPassword });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
}
