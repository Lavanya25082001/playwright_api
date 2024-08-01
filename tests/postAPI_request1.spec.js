const { test, expect } = require('@playwright/test');

//write a test for creating post api request 
test("creating POST API request using static request body", async ({ request }) => {
    // Creating post API request
    const postAPIResponse = await request.post(`/booking`, {
        data: {
            "firstname": "Sally",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2013-02-23",
                "checkout": "2014-10-23"
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
        expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Sally");
        expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Brown");

        //validating nested json objects
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2013-02-23");
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2014-10-23");
    } else {
        const errorText = await postAPIResponse.text();
        console.error(`Error: ${postAPIResponse.status()} - ${errorText}`);
    }
});


