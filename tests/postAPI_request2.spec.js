const { test, expect } = require('@playwright/test');

const bookingDetails=require("../test-data/postData.json")
//write a test
test("creating POST API request using static JSON file", async ({ request }) => {
    // Creating post API request
    const postAPIResponse = await request.post(`/booking`, {
        data: bookingDetails
    });

    if (postAPIResponse.ok()) {
        // Validating status code
        expect(postAPIResponse.status()).toBe(200);
        
        const postAPIResponseBody = await postAPIResponse.json();
        console.log(postAPIResponseBody);

        // Validating JSON response
        expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Joe");
        expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Doe");

        //validating nested json objects
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2013-03-03");
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout", "2014-04-04");
    } else {
        const errorText = await postAPIResponse.text();
        console.error(`Error: ${postAPIResponse.status()} - ${errorText}`);
    }
});


