import passport from 'passport'
import 'dotenv/config'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import { googleAuthentication } from '../Services/userAuth.service.js'
const URL=`http://localhost:3000/api/v1/auth/google/callback`

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:URL
 },
 googleAuthentication
 ));

 export default passport