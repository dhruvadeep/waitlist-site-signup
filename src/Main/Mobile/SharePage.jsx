import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaShare } from "react-icons/fa";

export default function SharePage() {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const [buttonText, setButtonText] = useState("Copy to Clipboard 📃");

  const handleCopy = () => {
    const textToCopy = `join.dhruvadeep.dev/share?ref=${email}&action=initial&social=true`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use clipboard API if available
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setButtonText("Copied!");
          setTimeout(() => setButtonText("Copy to Clipboard 📃"), 2000);
        },
        () => fallbackCopyToClipboard(textToCopy) // Fallback in case of failure
      );
    } else {
      fallbackCopyToClipboard(textToCopy);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Ensure the textarea is not visible to the user
    textArea.style.position = "fixed";
    textArea.style.top = "-1000px";
    textArea.style.left = "-1000px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      if (document.execCommand("copy")) {
        setButtonText("Copied!");
      } else {
        setButtonText("Failed to copy");
      }
    } catch (err) {
      setButtonText("Failed to copy");
    }

    document.body.removeChild(textArea);

    setTimeout(() => setButtonText("Copy to Clipboard 📃"), 2000);
  };

  const shareUrl = `join.dhruvadeep.dev/share?ref=${email}&action=initial&social=true`;
  const shareText = `Hey! ${name} shared this link with you. Join now and get awesome updates faster than anyone else. ${shareUrl}`;

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: "Earn More When You Share!",
      text: "Join the waitlist and earn rewards. Use my link to sign up!",
      url: shareUrl, // Ensure this is a valid URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error.message);
      }
    } else {
      alert(
        "Sharing is not supported on this device. Please copy the link manually."
      );
    }
  };

  // if email is not present redirect to initial page
  if (localStorage.getItem("email") === null) {
    window.location.href = "?action=initial";
  }

  return (
    <div className="initial-page bg-[#1E1E1E] min-h-screen h-auto relative text-white p-8 pt-10">
      <h1 className="text-3xl font-extrabold font-poppins">
        Earn More When You Share!
      </h1>
      <p
        className="text-base mt-4 font-open-sans"
        style={{
          fontSize: "12px",
          lineHeight: "20px",
        }}
      >
        Every time a friend joins the waitlist, you earn up to ₹50 more! Share
        your unique link and start stacking up your rewards today.
      </p>

      <div className="bg-[#292929] rounded-md h-[300px] mt-14 flex justify-center items-start">
        <div className="p-4 mt-2" style={{ width: "97%" }}>
          <input
            type="text"
            value={shareUrl}
            className="w-full h-full bg-[#292929] text-white border border-[#1E1E1E] rounded-md p-6"
            readOnly
          />
          <button
            className="button-email bg-[#387478] text-white w-full py-4 rounded-lg font-bold text-sm mt-5"
            onClick={handleCopy}
          >
            {buttonText}
          </button>

          {/* Social Media Buttons */}
          <div className="flex justify-around mt-8 gap-2">
            <div className="flex flex-col items-center">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center bg-[#25D366] w-12 h-12 rounded-full"
              >
                <FaWhatsapp size={20} />
              </button>
              <span className="mt-2 text-sm">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleFacebookShare}
                className="flex items-center justify-center bg-[#1877F2] w-12 h-12 rounded-full"
              >
                <FaFacebook size={20} />
              </button>
              <span className="mt-2 text-sm">Facebook</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center bg-[#1DA1F2] w-12 h-12 rounded-full"
              >
                <FaTwitter size={20} />
              </button>
              <span className="mt-2 text-sm">Twitter</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center bg-[#6B7280] w-12 h-12 rounded-full"
              >
                <FaShare size={20} />
              </button>
              <span className="mt-2 text-sm">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
