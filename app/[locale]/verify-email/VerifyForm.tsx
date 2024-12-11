"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyForm = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isCodeResent, setIsCodeResent] = useState(false);
  // const [email, setEmail] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();

  // useEffect(() => {

  //   if (emailParam) {
  //     setEmail(emailParam);
  //   }
  // }, [searchParams]);

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: verificationCode,
          email,
        }),
      });

      if (res.ok) {
        setVerified(true);
        setTimeout(() => {
          router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.message || "Verification failed");
      }
    } catch (error) {
      setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsCodeResent(false);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsCodeResent(true);
      } else {
        const resp = await res.json();
        setError(
          resp.message || "Error when resending the verification e-mail",
        );
      }
    } catch (e) {
      setError("An unknown error has occurred");
    }
  };

  return (
    <div className="flex justify-center mt-20 h-screen font-display">
      <div className="w-full max-w-md text-center">
        {verified && (
          <>
            <div className="text-green-600 text-lg font-bold">
              E-mail verified!
            </div>
            <div>Your e-mail address has been successfully verified.</div>
          </>
        )}

        {error && (
          <div className="flex items-center justify-center mb-4 p-4 text-red-700 border-b border-red-700">
            {error}
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xl font-bold mb-6 text-gold">
            Please check your Email
          </h2>
          <p className="text-grafit">
            Email sent on email:
            <br />
            <span className="font-bold">{email}</span> <br />
            Please check your mailbox and enter the code in the form below to
            complete your registration.
          </p>
          <form onSubmit={verifyEmail} className="mt-6">
            <div className="mb-4 flex flex-col gap-2">
              <label
                htmlFor="verificationCode"
                className="text-grafit font-semibold"
              >
                Enter confirmation code:
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full border border-sky-blue rounded bg-sky-blue-back p-2 focus:outline-teal focus:shadow-outline"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-8 py-4 text-white bg-teal uppercase rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </form>
          <p className="mt-6">
            If you do not see the e-mail, check your spam folder or{" "}
            <button
              onClick={handleResendEmail}
              className="text-teal text-sm border-b border-transparent hover:border-teal transition-border duration-300 ease-in-out"
            >
              Click here
            </button>{" "}
            to send the code again.
          </p>
        </div>
        {isCodeResent && (
          <div className="flex items-center text-center justify-center mt-4 p-4 text-green ">
            The confirmation e-mail has been resent. <br /> Please check your
            mailbox.
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyForm;
