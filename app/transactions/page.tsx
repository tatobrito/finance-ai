import AddTransactionButton from "../_components/add-transaction-button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="p-6 space-y-6">
      {/* Titulo e botão*/}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold space-y-6">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable
        columns={TransactionColumns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
    </div>
  );
};

export default TransactionsPage;
