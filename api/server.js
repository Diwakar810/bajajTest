const express = require('express');
const bodyParser = require('body-parser');

const app = express();

module.exports = app;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input 'data' must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const all_chars = [];

        const isNumber = /^-?\d+$/;
        const isLetter = /^[a-zA-Z]$/;

        for (const item of data) {
            if (typeof item !== 'string') {
                continue;
            }

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

            for (const char of item) {
                if (isLetter.test(char)) {
                    all_chars.push(char);
                } else {
                    special_characters.push(char);
                }
            }

            if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            }
        }

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
        
        const userDetails = {
            user_id: "john_doe_01012025",
            email: "john.doe@example.com",
            roll_number: "VIT12345"
        };
        
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
