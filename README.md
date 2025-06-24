# Event Search Web Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Static Page
As starting scratch, a static web page was created using Python, Flask, HTML, JavaScript, and Ajax.

## [Web Application](https://cs571hw8-381320.wn.r.appspot.com/search)
The web application is developed using Angular, TypeScript, Bootstrap, HTML, Ajax, RWD (Responsive Web Design), and Node.js. It provides an interactive interface for event searching, powered by the Ticketmaster service. You can try it, [here](https://cs571hw8-381320.wn.r.appspot.com/search).


### Quick Test Scenarios
| Scenario | Keyword        | Location |
| -------- | -------------- | -------- |
| 1        | Justin Bieber  | LA       |
| 2        | BEYONCÉ        | LA       |

## Screenshots

Here are some screenshots showcasing the functionality and user interface of the web application:

<img width="1394" alt="1" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/0e44bd9e-56ff-457f-9b01-d9eb9ea1bcc3"> <br><br><br>
<img width="1356" alt="2" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/d22afaed-c910-4fed-ace4-ee6a0a331367"> <br><br><br>
<img width="1103" alt="3" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/e94ee8f9-1e62-4511-bdd4-d06a20c31218"> <br><br><br>
<img width="1070" alt="4" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/917fa433-3dbe-437b-bc2c-2328aba1e62b"> <br><br><br>
<img width="1063" alt="5" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/59f4a86d-6843-48f4-bfda-ecf0f49a18e2"> <br><br><br>
<img width="1056" alt="6" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/e4595bca-b965-432d-b594-1d4119506b6c"> <br><br><br>
<img width="984" alt="7" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/927c2d4f-988b-4884-af99-2ba29870c986"> <br><br><br>
<img width="949" alt="8" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/64d125c6-55fe-49f4-ad06-3d0951362791"> <br><br><br>
<img width="1100" alt="81" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/665ee0b8-c0e5-4d0c-8821-542156d536f6"> <br><br><br>
<img width="909" alt="9" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/2b13a394-b103-492f-bc85-13cc5b5f2c81"> <br><br><br>
<img width="955" alt="10" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/d082bb5d-a17b-4a5e-a251-33e2344073b4"> <br><br><br>
<img width="1084" alt="11" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/84b09376-cbba-40f4-955b-a29b0c06e394"> <br><br><br>
<img width="1092" alt="12" src="https://github.com/yechanse/Event-Search-Web-Application/assets/122432845/ead790df-d7e4-4075-946b-57282398f766"> <br>

## Technologies Used

| Area     | Technologies         |
| -------- | -------------------- |
| Backend  | Node.js + Express.js |
| Frontend | Angular              |

## Major API endpoints
The web application communicates with the backend using the following major API endpoints:
<br>

| Purpose                 | Endpoint                   | Query Params                                           | Example                                                                                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Auto Complete Search    | /api/autocomplete          | keyword                                                | [autocomplete](https://cs571hw8-381320.wn.r.appspot.com/api/autocomplete?keyword=pink)                                       |
| General Event Info      | /api/eventresult           | keyword, distance, category, location, autoDetectLocation | [eventresult](https://cs571hw8-381320.wn.r.appspot.com/api/eventresult?keyword=P!NK&distance=10&category=default&location=...) |
| Event Details           | /api/eventdetail           | eventID                                                | [eventdetail](https://cs571hw8-381320.wn.r.appspot.com/api/eventdetail?eventID=Z7r9jZ1AdqPJo)                                |
| Venue Info              | /api/venue                 | venueName                                              | [venue](https://cs571hw8-381320.wn.r.appspot.com/api/venue?venueName=Hollywood%20Pantages%20Theatre)                    |
| Artist & Album Info     | /api/spotify               | artists                                                | [spotify](https://cs571hw8-381320.wn.r.appspot.com/api/spotify?artists=[%22Taylor%20Swift%22,%20%22HAIM%22])               |


