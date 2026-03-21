import express from "express";
import * as XLSX from "xlsx";

const router = express.Router();

router.get("/api-documentation", async (req, res) => {
  try {
    // API documentation data
    const apiData = [
      {
        method: "POST",
        endpoint: "/api/send-email-otp",
        description: "Send OTP to email for registration",
        samplePayload: JSON.stringify({
          email: "user@example.com"
        }, null, 2),
        sampleResponse: JSON.stringify({
          message: "OTP sent to email"
        }, null, 2),
        statusCodes: "200, 500"
      },
      {
        method: "POST",
        endpoint: "/api/register",
        description: "Register new user with details",
        samplePayload: JSON.stringify({
          email: "premkumar.jaguar@gmail.com",
          password: "12345678",
          firstName: "Premkumar",
          lastName: "Vellaisamy",
          npi: "12345",
          phone: "9715789136"
        }, null, 2),
        sampleResponse: JSON.stringify({
          message: "User registered successfully. Please verify your email."
        }, null, 2),
        statusCodes: "200, 400, 500"
      },
      {
        method: "POST",
        endpoint: "/api/verify-otp",
        description: "Verify OTP and update user email verification status",
        samplePayload: JSON.stringify({
          email: "premkumar.jaguar@gmail.com",
          otp: "123456"
        }, null, 2),
        sampleResponse: JSON.stringify({
          message: "OTP verified successfully",
          user: {
            id: 1,
            email: "premkumar.jaguar@gmail.com",
            first_name: "Premkumar",
            last_name: "Vellaisamy",
            npi: "12345",
            phone: "9715789136",
            email_verified: true
          }
        }, null, 2),
        statusCodes: "200, 400, 404, 500"
      },
      {
        method: "POST",
        endpoint: "/api/send-reset-otp",
        description: "Send password reset OTP to email",
        samplePayload: JSON.stringify({
          email: "user@example.com"
        }, null, 2),
        sampleResponse: JSON.stringify({
          success: true,
          message: "Password reset OTP sent to your email address"
        }, null, 2),
        statusCodes: "200, 400, 500"
      },
      {
        method: "POST",
        endpoint: "/api/reset-password",
        description: "Reset password using OTP verification",
        samplePayload: JSON.stringify({
          email: "user@example.com",
          otp: "123456",
          newPassword: "newPassword123"
        }, null, 2),
        sampleResponse: JSON.stringify({
          success: true,
          message: "Password reset successfully. You can now login with your new password."
        }, null, 2),
        statusCodes: "200, 400, 404, 500"
      },
      {
        method: "POST",
        endpoint: "/api/login",
        description: "Login user and return tokens",
        samplePayload: JSON.stringify({
          email: "user@example.com",
          password: "password123"
        }, null, 2),
        sampleResponse: JSON.stringify({
          success: true,
          accessToken: "jwt_token_here",
          refreshToken: "refresh_token_here"
        }, null, 2),
        statusCodes: "200, 401, 403, 500"
      },
      {
        method: "POST",
        endpoint: "/api/refresh",
        description: "Refresh access token using refresh token",
        samplePayload: JSON.stringify({
          refreshToken: "refresh_token_here"
        }, null, 2),
        sampleResponse: JSON.stringify({
          accessToken: "new_jwt_token_here"
        }, null, 2),
        statusCodes: "200, 401, 403"
      },
      {
        method: "GET",
        endpoint: "/api/profile",
        description: "Get user profile (requires authentication)",
        samplePayload: "Headers: Authorization: Bearer <access_token>",
        sampleResponse: JSON.stringify({
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "user@example.com"
        }, null, 2),
        statusCodes: "200, 401"
      },
      {
        method: "GET",
        endpoint: "/api/verify-email",
        description: "Verify email using token",
        samplePayload: "Query: ?token=verification_token_here",
        sampleResponse: "Email verified successfully",
        statusCodes: "200, 400"
      }
    ];

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["Method", "Endpoint", "Description", "Sample Payload", "Sample Response", "Status Codes"]
    ];

    // Add API data
    apiData.forEach(api => {
      wsData.push([
        api.method,
        api.endpoint,
        api.description,
        api.samplePayload,
        api.sampleResponse,
        api.statusCodes
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths for better readability
    const colWidths = [
      { wch: 8 },   // Method
      { wch: 25 },  // Endpoint
      { wch: 40 },  // Description
      { wch: 50 },  // Sample Payload
      { wch: 50 },  // Sample Response
      { wch: 15 }   // Status Codes
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "API Documentation");

    // Generate buffer
    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Set headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=api_documentation_${new Date().toISOString().split('T')[0]}.xlsx`
    );

    res.send(excelBuffer);

  } catch (err) {
    console.error("Error generating API documentation Excel file:", err);
    res.status(500).json({ message: "Error generating API documentation file" });
  }
});

export default router;
