/////////////////  Dependencies /////////////////
const LocalStrategy = require("passport-local");
const chalk = require('chalk');

// Set up passport configuration
function initialize(passport, getUserByUsername, getUserById) {
    
    const authenticateUser = async (username, password, done) => {
        
        const user = getUserByUsername(username);

        // Check username and password
        user.then(function(user){
            if (user == null) {
                return done(null, false, { message: "No user with that username"});
            }
            try {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;
                    if(isMatch){
                        return done(null, user);
                    } else {
                    
                        return done(null, false, { message: "Password incorrect"});
                    }
                });
            } catch (e) {
                return done(e);
            }
        })
        
    }

    // Use local strategy with username field
    passport.use(new LocalStrategy({ usernameField: 'username'},
    authenticateUser));

    // Serialize User by id
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    // Deserialize User by id
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });

}

// Export initialize
module.exports = initialize;