import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth/next";

const AccountHome = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>User: {JSON.stringify(session?.user)}</div>
      <div>
        <hr />
        Hello, {session?.user.name} {session?.user.surname}!
      </div>
    </>
  );
};

export default AccountHome;
