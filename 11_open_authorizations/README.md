live render link: https://nodejs-backend-1-tfzk.onrender.com
---------------------------------------
c:\Users\CHARMEE PANELIYA\Downloads\ChatGPT Image Jul 1, 2026, 01_07_31 PM.png
------------------
c:\Users\CHARMEE PANELIYA\Downloads\Gemini_Generated_Image_wsxxsewsxxsewsxx.png

server.js


app.use(
 session({
   secret:process.env.SESSION_SECRET,
   reseve:false,
   saveUninitialized:true,
   cookie:{
      path:"/",
      httpOnly:true,
      secure:false,
      maxAge:60*60*1000
   }
 })
)

Flow

Client

↓

Request

↓

Express

↓

Session Middleware

↓

Check karta hai

----------------------------------------------------------

shortcut flow
-----------------------------
-----------------------------
Server Start
     │
     ▼
Load .env
     │
     ▼
Connect MongoDB
     │
     ▼
Create Express App
     │
     ▼
Session Middleware
     │
     ▼
Passport Initialize
     │
     ▼
Passport Session
     │
     ▼
Register Routes
     │
     ▼
Server Running
──────────────────────────────
User Request
     │
     ▼
Session checks Cookie (connect.sid)
     │
     ▼
Passport gets User from Session
     │
     ▼
req.user available
     │
     ▼
Requested Route Executes
     │
     ▼
Response Sent

-----------------------------------------------


1. passport.initialize()
-------------------------
app.use(passport.initialize());

Why use?
-------

Passport ko app me activate karta hai.
Authentication strategies (Google, Local, JWT, etc.) ko enable karta hai.

Without this:

passport.authenticate("google")

kaam nahi karega.

2. passport.session()
---------------------------
app.use(passport.session());

Why use?
---------------------

Session se logged-in user ko har request par automatically restore karta hai.
deserializeUser() ko call karta hai.
req.user available kar deta hai.

Flow:
------

Browser
   │
   ▼
connect.sid Cookie
   │
   ▼
express-session
   │
   ▼
passport.session()
   │
   ▼
deserializeUser()
   │
   ▼
req.user

----------


Easy Difference
----------------
Middleware	Purpose
passport.initialize()	Passport ko start/activate karta hai.
passport.session()	Session se user ko load karke req.user banata hai.