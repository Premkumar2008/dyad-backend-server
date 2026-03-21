import express from "express";
import dotenv from "dotenv";
dotenv.config();

import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js";
import refreshRoute from "./routes/refresh.js";
import verifyEmailRoute from "./routes/verifyEmail.js";
import sendEmailOtp from "./routes/sendEmailOtp.js";
import apiDocumentationRoute from "./routes/apiDocumentation.js";
import verifyOtpRoute from "./routes/verifyOtp.js";
import forgotPasswordRoute from "./routes/forgotPassword.js";
import testRoute from "./routes/test.js";

const app = express();
app.use(express.json());

app.use("/api", profileRoute);
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", refreshRoute);
app.use("/api", verifyEmailRoute);
app.use("/api", sendEmailOtp);
app.use("/api", apiDocumentationRoute);
app.use("/api", verifyOtpRoute);
app.use("/api", forgotPasswordRoute);
app.use("/api", testRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});