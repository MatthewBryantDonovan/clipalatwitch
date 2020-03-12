const LocalStrategy = require("passport-local");
const chalk = require('chalk');

function initialize(passport, getUserByUsername, getUserById) {
    
    const authenticateUser = async (username, password, done) => {
        
        
        const user = getUserByUsername(username);
        user.then(function(user){
            if (user == null) {
                console.log(chalk.bgMagenta("INCORRECT USERNAME"));
                return done(null, false, { message: "No user with that username"});
            }
            try {

                user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;
                    if(isMatch){
                        console.log(chalk.bgGreen("User + Pass matched"));
                        return done(null, user);
                    } else {
                        console.log(chalk.bgMagenta("INCORRECT PASS"));
                    
                        return done(null, false, { message: "Password incorrect"});
                    }
                });

            } catch (e) {
                return done(e);
            }
        })
        
    }

    passport.use(new LocalStrategy({ usernameField: 'username'},
    authenticateUser));

    passport.serializeUser((user, done) => {
        console.log(chalk.bgGreen(" ~~~~~~~~~~~~~~~~ user info ~~~~~~~~~~~~~~~~"));
        console.log(chalk.bgBlue(user));
        console.log(chalk.bgGreen(" ~~~~~~~~~~~~~~~~ user info ~~~~~~~~~~~~~~~~"));

        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(chalk.green(" ~~~~~~~~~~~~~~~~ user id ~~~~~~~~~~~~~~~~"));
        console.log(chalk.blue(id));
        console.log(chalk.green(" ~~~~~~~~~~~~~~~~ user id ~~~~~~~~~~~~~~~~"));

        
        return done(null, getUserById(id));
    });

}

module.exports = initialize;