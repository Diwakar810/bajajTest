export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse request body safely (Vercel sometimes gives string body)
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const data = body.data || [];

      let odd_numbers = [];
      let even_numbers = [];
      let alphabets = [];
      let special_characters = [];
      let sum = 0;
      let alphaConcat = "";

      data.forEach(item => {
        const str = String(item);

        if (/^\d+$/.test(str)) {
          // It's a number
          const num = parseInt(str);
          if (num % 2 === 0) {
            even_numbers.push(str);
          } else {
            odd_numbers.push(str);
          }
          sum += num;
        } else if (/^[a-zA-Z]+$/.test(str)) {
          // It's alphabet(s)
          alphabets.push(str.toUpperCase());
          alphaConcat += str;
        } else {
          // Special characters
          special_characters.push(str);
        }
      });

      // Build concat_string (reverse + alternating caps)
      let concat_string = "";
      let upper = true;
      for (let i = alphaConcat.length - 1; i >= 0; i--) {
        concat_string += upper
          ? alphaConcat[i].toUpperCase()
          : alphaConcat[i].toLowerCase();
        upper = !upper;
      }

      // Response JSON
      return res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999",   // replace with your name_dob
        email: "john@xyz.com",          // replace with your email
        roll_number: "ABCD123",         // replace with your roll no.
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
      });

    } catch (err) {
      return res.status(500).json({
        is_success: false,
        error: err.message
      });
    }
  } else {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }
}
