import { db } from "@/_lib/prisma";

const TransactionsPage = async () => {
  // acessar as transações do banco
  const transaction = await db.transaction.findMany({});
  return (
    <div className="">
      {transaction.map((transaction) => (
        <div key={transaction.id} className="mb-4">
          {transaction.name}
        </div>
      ))}
    </div>
  );
};

export default TransactionsPage;
