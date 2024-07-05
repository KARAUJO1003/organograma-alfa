import { ReactNode } from "react";

export const OrgItem = ({ subordinates }: any) => {
  return (
    <div className="w-fit min-w-64  font-bold justify-center flex min-h-32 p-6 rounded-lg border bg-zinc-800 text-white">
      {children}
    </div>
  );
};
