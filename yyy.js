
import express from "express";
function errorHandler(err, req, res, next) {
    console.error("tappara");
    res.status(504).json({ error111: "1" + err.message });
}

const app = express();
app.get('/y', (req, res,next) => {
    next(new Error('Not Found'));
    //res.send('Hello World!')
})

app.use(errorHandler);
// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
