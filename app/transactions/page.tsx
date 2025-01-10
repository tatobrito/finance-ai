import AddTransactionButton from "../_components/add-transaction-button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 overflow-hidden">
        {/* Titulo e botão*/}
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-bold space-y-6">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <ScrollArea>
          <DataTable
            columns={TransactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
