import { paymnetApi } from "../api";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { resetCart } from "../../redux/slices/cartSlice";
const { CAPTURE_PAYMENT, VERIFY_PAYMENT } = paymnetApi;

function loadScript(src) {
  return new Promise(function (resolve) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.append(script);
  });
}
export const capturePayment = async (
  courses,
  token,
  userDetails,
  dispatch,
  navigate
) => {
  const toastId = toast.loading("loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      toast.dismiss(toastId);
      return;
    }
    const response = await apiConnector("POST", CAPTURE_PAYMENT, courses, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }

    const options = {
      key: process.env,
      currency: response.data.data.currency,
      amout: `${response.data.data.amount}`,
      order_id: response.data.data.id,
      name: "Quantum Eduction",
      prefil: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR............", error);
    toast.error("Could Not make Payment.");
  }
  toast.dismiss(toastId);
};

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");

  try {
    const response = await apiConnector("POST", VERIFY_PAYMENT, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful. You are Added to the course ");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
}
