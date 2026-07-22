import razorpay from "razorpay"
import crypto from "crypto"

const razorpay = new razorpay({
    key_id,
    key_secrect
})

export const createOrder = async (req, res, next) => {
    try {
        const amount = req.body;
        
        const order = await razorpay.orders.create({
            amount:amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        })

        return res.status(201).json({
            message:"Payment Successfully",
            order
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const verifyPayment = async (req, res, next) => {
    try {
        const {razorpay_order_id,
        razarpay_payment_id,
        razorpay_signature
        } = req.body

        const generateSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id} | ${razarpay_payment_id}`)
        .digest("hex")


        if (generateSignature !== razorpay_signature) {
            return res.status(400).json({
                message:"Payment False"
            })
        }

        return res.status(200).json({
            message:"Payment verified successfull"
        })

    } catch (error) {
        return res.status(500).json({
            message:error?.message
        })
    }
}

export const webhook = async (req, res) => {
    try {
        const event = req.body.event

        switch (event) {
            case "payment.captured":
                console.log("Payment Captured");
                break;
            case "payment.failed":
                console.log("Payment Failed");
                break;

            default:
                console.log(event);
                
        }

        return res.status(200).json({received:true})
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}