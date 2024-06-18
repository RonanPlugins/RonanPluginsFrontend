import profile from "@/api/profile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StripeRefresh() {
  const { accountId } = useParams();
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);

  async function getLink() {
    setAccountLinkCreatePending(true);
    if (!accountId) return;
    const link = await profile.createStripeAccountLink(accountId);
    if (link === null) {
      setError(true);
    } else {
      window.location.href = link.url;
    }

    setAccountLinkCreatePending(false);
  }

  useEffect(() => {
    if (accountId) {
      getLink();
    }
  }, [accountId]);

  return (
    <div className="container">
      <div className="banner">
        <h2>RonanPlugins</h2>
      </div>
      <div className="content">
        <h2>Add information to start accepting money</h2>
        <p>
          RonanPlugins is the world's leading air travel platform: join our team
          of pilots to help people travel faster.
        </p>
        {error && <p className="error">Something went wrong!</p>}
      </div>
      <div className="dev-callout">
        {accountId && (
          <p>
            Your connected account ID is:{" "}
            <code className="bold">{accountId}</code>
          </p>
        )}
        {accountLinkCreatePending && <p>Creating a new Account Link...</p>}
      </div>
    </div>
  );
}
