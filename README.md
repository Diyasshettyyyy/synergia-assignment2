# Synergia Event Booking API

This project is a simple API for managing event bookings. Users can create, read, update, and delete bookings, as well as search or filter them by email or event name. It is built using Node.js, Express, and MongoDB.

## Features

- Add new event bookings with details like name, email, event, and ticket type.
- View all bookings or a specific booking by ID.
- Update existing bookings.
- Delete bookings.
- Search bookings by email.
- Filter bookings by event name.
Usage

Start the server to use the API:

node index.js


The API will run on port 2000. You can use tools like Postman or curl to test the endpoints:

Get all bookings: GET /api/bookings

Get booking by ID: GET /api/bookings/:id

Create booking: POST /api/bookings

Update booking: PUT /api/bookings/:id

Delete booking: DELETE /api/bookings/:id

Search bookings by email: GET /api/bookings/search?email=example@example.com

Filter bookings by event: GET /api/bookings/filter?event=EventName

Technologies Used

Node.js

Express.js

MongoDB

MongoDB Node.js Driver

Contributing

You can contribute by:

Forking the repository

Making your changes in a new branch

Submitting a pull request
