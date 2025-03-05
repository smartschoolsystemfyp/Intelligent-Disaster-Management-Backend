import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Donation from "../models/donation.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  const { donorName, donorContact, amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0)
    throw new Error("Invalid amount");

  if (!donorName || !donorContact) throw new Error("All fields are required");

  const amountInPaisa = Math.round(amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInPaisa,
    currency: "pkr",
    payment_method_types: ["card"],
  });

  await Donation.create({
    donorName,
    donorContact,
    amount,
    donationType: "Monetary",
    status: "Recieved",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

export default paymentIntent;
