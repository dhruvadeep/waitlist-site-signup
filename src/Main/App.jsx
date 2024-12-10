// importing the initial page
import InitialPage from "./Mobile/InitialPage";
import SignUP from "./Mobile/SignUP";
import SharePage from "./Mobile/SharePage";

// get url params
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    ref: params.get("ref") || "",
    id: params.get("id") || "",
    action: params.get("action") || "initial",
  };
};

export default function App() {
  const { ref, id, action } = getQueryParams();
  if (action == "signup" || action == "share") {
    // ignore
  } else {
    localStorage.setItem("referral", ref);
  }
  const renderPage = () => {
    switch (action) {
      case "initial":
        return <InitialPage referral={ref} _id={id} />;
      case "signup":
        return <SignUP referral={ref} _id={id} />;
      case "share":
        return <SharePage referral={ref} _id={id} />;
      default:
        return <InitialPage referral={ref} _id={id} />;
    }
  };

  return <>{renderPage()}</>;
}
