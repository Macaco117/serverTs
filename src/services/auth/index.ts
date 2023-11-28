import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, extractJwt } from 'passport-jwt';
import { getUserUtils } from "../servicesLocator/composer"
import CryptoJS from 'crypto-js'

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const userUtil = getUserUtils()
            const user = await userUtil.getUserByEmail(email)
            if (!user){
                return done("User not found", false);
            }
            if ( typeof user === "object"){
                const decrypted = CryptoJS.AES.decrypt(user.password, process.env.Secret_Key).toString(CryptoJS.env)
                if (password !== decrypted){
                    return done("Password incorrect", false)
                }
                const userData = {
                    id: user.id,
                    names: user.names,
                    lastNames: user.lastNames,
                    email: user.email,
                }
                return done(null, userData);
            }
            return done("Error inesperado", false);
        }
    )
)