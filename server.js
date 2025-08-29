// api/server.js
// Vercel will automatically run this as a serverless function.

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Vercel requires the app to be exported, not started with app.listen().
module.exports = app;

// Middleware to parse JSON bodies from incoming requests.
app.use(bodyParser.json());

// Main route for the API, handling POST requests to /bfhl.
app.post('/bfhl', (req, res) => {
    // This is a crucial try-catch block to handle any exceptions gracefully,
    // as required by the problem statement.
    try {
        const { data } = req.body;

        // Ensure the input data is an array as expected.
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input 'data' must be an array."
            });
        }

        // Initialize all required response arrays and variables.
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const all_chars = [];

        // Regular expressions to check the type of each string element.
        const isNumber = /^-?\d+$/;
        const isLetter = /^[a-zA-Z]$/;

        // Loop through each item in the input array.
        for (const item of data) {
            if (typeof item !== 'string') {
                continue;
            }

            // Check if the item is a number string.
            if (isNumber.test(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
                continue;
            }

            // Iterate over each character of the string.
            for (const char of item) {
                if (isLetter.test(char)) {
                    all_chars.push(char);
                } else {
                    special_characters.push(char);
                }
            }

            // Check if the entire item is an alphabet string.
            if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            }
        }

        // Create the 'concat_string' with the required logic.
        let concat_string = '';
        const reversed_chars = all_chars.reverse();

        for (let i = 0; i < reversed_chars.length; i++) {
            const char = reversed_chars[i];
            if (i % 2 === 0) {
                concat_string += char.toUpperCase();
            } else {
                concat_string += char.toLowerCase();
            }
        }
        
        // This is a placeholder for your personal information.
        const userDetails = {
            user_id: "john_doe_01012025",
            email: "john.doe@example.com",
            roll_number: "VIT12345"
        };
        
        // Construct the final JSON response object.
        const response = {
            is_success: true,
            user_id: userDetails.user_id,
            email: userDetails.email,
            roll_number: userDetails.roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            message: "An internal server error occurred."
        });
    }
});
