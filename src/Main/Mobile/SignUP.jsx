// import use state
import { useState } from "react";

export default function SignUP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  if (localStorage.getItem("email") && localStorage.getItem("name")) {
    window.location.href = "?action=share";
  }
  return (
    <>
      <div className="initial-page bg-[#1E1E1E] min-h-screen h-auto relative text-white p-8 pt-10">
        <>
          <h1 className="text-4xl font-extrabold font-poppins">
            You’re Just a Step
          </h1>
          <h1 className="text-4xl font-extrabold font-poppins">Away!</h1>
        </>
        <>
          <p
            className="text-base mt-4 font-open-sans"
            style={{
              fontSize: "15px",
            }}
          >
            Fill out your info to claim your rewards and be part of the
            excitement from the start. Let’s do this!
          </p>
        </>

        <div className="mt-14">
          {/* take two inputs name and email and have the background as #292929 and have a nice border thats 000000 and text is 3 px left from middle and text is white  */}
          <input
            type="text"
            placeholder="Name"
            className="w-full h-16 bg-[#292929] border border-[#000000] rounded-md text-white pl-9 shadow-lg"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="p-1"></div>
          <input
            type="text"
            placeholder="Email Address"
            className="w-full h-16 bg-[#292929] border border-[#000000] rounded-md text-white pl-9 shadow-lg"
            onChange={(e) => setEmail(e.target.value)}
            itemType="email"
          />
        </div>

        <div className="mt-48"></div>
        <button
          className="button-email bg-[#387478] text-white w-full py-4 rounded-lg font-bold text-2xl mt-5"
          onClick={() => {
            // get name and email from input
            console.log(name, email);
            // make the button disabled and change the text to "Processing..."
            document.querySelector(".button-email").innerHTML = "Processing...";
            document.querySelector(".button-email").disabled = true;
            // change the text to a bit grey
            document.querySelector(".button-email").style.backgroundColor =
              "#292929";

            // send post request to the backend
            const url_post = "https://waitlist.dhruvadeep.dev/signup";
            // data to be sent {name, email, ref_by}
            // return data possible
            // 1."message": "Email already exists"
            // 2."message": "Invalid email address"
            // 3."message": "User saved successfully"

            fetch(url_post, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                email: email,
                ref_by: localStorage.getItem("referral") || "DHRUVADEEP",
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.message === "User saved successfully") {
                  // save the email and name in local storage
                  localStorage.setItem("email", email);
                  localStorage.setItem("name", name);
                  document.querySelector(".button-email").innerHTML = "Done 🎊";
                  // redirect to share page
                  window.location.href = "?action=share";
                } else {
                  // if email already exists

                  // change the text to "Email already exists"
                  if (data.message === "Email already exists") {
                    document.querySelector(".button-email").innerHTML =
                      "Email already exists";

                    // send the user to the share page
                    localStorage.setItem("email", email);
                    window.location.href = "?action=share";
                  }

                  // if email is invalid
                  if (data.message === "Invalid email address") {
                    // change the text to "Invalid email address"
                    document.querySelector(".button-email").innerHTML =
                      "Invalid email address";

                    // after 2 seconds
                    setTimeout(() => {
                      // enable the button and change the text to "Let's Go 🎊"
                      document.querySelector(".button-email").innerHTML =
                        "Let’s Go 🎊";
                      document.querySelector(".button-email").disabled = false;
                      document.querySelector(
                        ".button-email"
                      ).style.backgroundColor = "#387478";
                    }, 2000);
                  } else {
                    // enable the button and change the text to "Let's Go 🎊"
                    document.querySelector(".button-email").innerHTML =
                      "Let’s Go 🎊";
                    document.querySelector(".button-email").disabled = false;
                    document.querySelector(
                      ".button-email"
                    ).style.backgroundColor = "#387478";
                  }
                }
              });
          }}
        >
          Let’s Go 🎊
        </button>

        <p className="text-xs text-white text-center mt-2">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </>
  );
}
