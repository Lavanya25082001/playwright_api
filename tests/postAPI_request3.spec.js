const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { DateTime } =require("luxon")

const firstName= faker.person.firstName()   
const lastName= faker.person.lastName()  
const totalPrice= faker.number.int(1000)      
const checkInDate=DateTime.now().toFormat('yyyy-MM-dd')
const checkOutDate=DateTime.now().plus({day:10}).toFormat('yyyy-MM-dd')
//write a test
test("creating POST API request using dynamic request body", async ({ request }) => {
    // Creating post API request
    const postAPIResponse = await request.post(`/booking`, {
        data: {
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
            },
            "additionalneeds": "Breakfast"
        }
    });

    if (postAPIResponse.ok()) {
        // Validating status code
        expect(postAPIResponse.status()).toBe(200);
        
        const postAPIResponseBody = await postAPIResponse.json();
        console.log(postAPIResponseBody);

        // Validating JSON response
        expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
        expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);

        //validating nested json objects
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", checkInDate);
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", checkOutDate);
    } else {
        const errorText = await postAPIResponse.text();
        console.error(`Error: ${postAPIResponse.status()} - ${errorText}`);
    }
});


