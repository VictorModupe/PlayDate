// eslint-disable-next-line import/no-unresolved
import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import  {nodemailer} from 'nodemailer';

// Initialize Firebase Admin SDK
const app = initializeApp();

// Initialize nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: 'aygsjswtntxjwkni',
  },
});

// Define Cloud Function to send playdate email
export const sendPlaydateEmail = functions.https.onCall(async (data, context) => {
  // Get user's email address
  const email = data.email;

  // Generate unique code for playdate
  const code = generateCode();

  // Construct email message
  const mailOptions = {
    from: 'Playdate <noreply@yourapp.com>',
    to: email,
    subject: 'Join my playdate!',
    text: `Hello! You have been invited to join a playdate. Your code is: ${code}.`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Playdate email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send playdate email to ${email}: ${error}`);
    return { success: false };
  }
});

// Helper function to generate unique code for playdate
function generateCode() {
  // Generate random 6-digit number
  return Math.floor(100000 + Math.random() * 900000);
}
