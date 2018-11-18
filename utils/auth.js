const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const bcrypt = require('bcrypt');
const userDB = require('../db/usersdb');
const key = require('../config/keys');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  
    try {
        const user = await userDB.findUserById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
});

passport.use(new GoogleStrategy({
    clientID: key.googleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (token, tokenSecret, profile, done) => {
       
        const user = await userDB.findUserByEmail(profile.emails[0].value);
        if (user !== undefined ) {
           
            done(null, user);
        } else {
           
            const img = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            console.log(img);
            const newUser = {
                googleid : profile.id,
                name: profile.name.givenName,
                email: profile.emails[0].value,
                lastname: profile.name.familyName,
                image: img,
                password: 'password-is-from-google'
            }

            const createdUser = await userDB.insertUser(newUser);
      
            if (createdUser !== undefined) {
              
                done(null, createdUser[0])
            } else {
                done(null, false)
            }
        }
    }
));
