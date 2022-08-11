# Cal Availability App! 

## Project Intro
Cal Availability is a simple application for users to create and store upcoming events onto their calendars.
- Users can click onto any available date and perform the following actions: 
- Create New Events
- View Event Details for any particular day 
- Invite participants to the event and to create their events on the calendar app! 
- (In development) To allow users to collaborate and indicate who is attending a event 

--- 

<img width="1361" alt="image" src="https://user-images.githubusercontent.com/89538905/184193520-3b631550-ec1b-4d84-b6f1-65e16737f00b.png">


## Stack and Library used  
- MongoDB
- ExpressJS
- NextJS
- NodeJS
- Recoil (State Management Library)
- Material UI (Component Library)
- Full Calendar (Calendar Library)

--- 

## Functions still in development 
- Edit Participants is not fully functional, inputRef does not seem to be updating for subsequent rerenders 
- Proposed fix: May have to do with re-rendering of components 

- Edit Event functionality 
- Upon sending out emails, there should be embedded links for participants to respond to their invitations and indicate isAttending = true 
- Additional functions to show who are the participants who have responded/attending/not attending 

--- 
## Interesting code snippets 
### Storing cookies in browser 
- Encountered issue with storing cookies upon calling backend API endpoint on localhost:5001 
- Issue due to setting cookies over CORS not allowed 
- Workarounds might have been to Set the HTTP headers Access-Control-Allow-Credentials ++ many other settings
- Another workaround to set up proxy server with rewrites handler function in NextJS 
```
const rewrites = {
  async rewrites() {
    return [
      {
        source: "/events/:slug",
        destination: "http://localhost:5001/events/:slug",
      },
      {
        source: "/calendars/:slug",
        destination: "http://localhost:5001/calendars/:slug",
      },
    ];
  },
};
```
- However, did not manage to do rewrites due to another "global" moduole.exports required for FullCalendar, could not find location to do a named module export :/ 

#### Working with NextJS built in API router 
- NextJS is able to handle API requests that are sent in to ```/pages/api``` 
![image](https://user-images.githubusercontent.com/89538905/184195402-b33684f8-440f-4742-b07e-6390c61d582d.png)
- calendarID.js 
```
export default async function handler(req, res) {
  // Checks if cookie is there, if not, create cookie
  if (!getCookie("calendarId", { req, res })) {
    setCookie("calendarId", uuid4(), { req, res, maxAge: 60 * 60 * 24 * 30 });

    const generatedCookie = getCookie("calendarId", { req, res });

    return res.json({
      status: "ok, cookie generated",
      cookie_value: generatedCookie,
    });
  } else {
    const existingCookie = getCookie("calendarId", { req, res });
    return res.json({
      status: "cookie already exists",
      cookie_value: existingCookie,
    });
  }
 ```
 - Calling API from frontend 
 ```
 const [userCookies, setUserCookies] = useRecoilState(userCookie);
  const fetchCalendarCookie = async (url, config) => {
    try {
      const url = "http://localhost:3000/api/calendarID";
      const config = { method: "GET" };
      const cookieGenerator = await fetch(url, config);
      const cookieGeneratorData = await cookieGenerator.json();
      setUserCookies(cookieGeneratorData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCalendarCookie();
  }, []);
  ```

### Future Development 
#### Leverage more on NextJS full stack capabilities to make use of server-side rendering 
- MongoDB can be setup to be connected with NextJS on localhost:3000 
- Benefits of doing so will allow data to be fetched server-side, and even allow for server-side functions to run and generate static pages for even faster pages to be built

