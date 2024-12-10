// import svg
import Together from "../../assets/Together.svg";

export default function InitialPage() {
  // get from local storage if email and name is present then redirect to dashboard
  const referral = localStorage.getItem("referral");
  if (localStorage.getItem("email") && localStorage.getItem("name")) {
    window.location.href = "?action=share";
  }
  return (
    <div className="initial-page bg-[#1E1E1E] min-h-screen h-auto relative">
      <img src={Together} alt="Together" className="w-5/6 h-auto mt-5 ml-10" />

      <div className="text-center text-white mt-5">
        <>
          <h1 className="text-3xl font-bold font-poppins">Big things are</h1>
          <h1 className="text-3xl font-bold font-poppins">
            brewing, and you’re{" "}
          </h1>
          <h1 className="text-3xl font-bold font-poppins">invited!</h1>
        </>
        <>
          <p className="text-base mt-1 font-open-sans mt-3">
            Join now, share your thoughts, and get rewarded.
          </p>
          <p className="text-base mt-1 font-open-sans">
            Sign up today to claim up to ₹100 for being part of the journey!
          </p>
        </>
        <div className="h-36"></div>

        <div className="w-full">
          <button
            className="bg-[#387478] text-white w-11/12 py-6 rounded-lg font-bold text-2xl mb-5"
            onClick={() => {
              // get name and email from input

              window.location.href = `/?action=signup&from=${referral}`;
            }}
          >
            Unlock My Rewards 🎁
          </button>

          <p className="text-xs text-white text-center mb-2">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
