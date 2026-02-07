const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './src/.env' });


const port = process.env.PORT;

const allowedOrigins = [
    "https://ai-anything-a4rs.vercel.app",
    "http://localhost:3000",
    "chrome-extension://dmhljjnonlhapikmelaefohecogokhio",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./src/routers/authRouter"));
app.use("/api", require("./src/routers/saloonsRouter"));
app.use("/api", require("./src/routers/bookingsRouter"));

// app.use("/api", require("./src/routers/authRouter"));




app.get("/", (req, res) => {

    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
