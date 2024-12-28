import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";

interface TransactionsPageBadgeProps {
  transaction: Transaction;
}
const TransactionsPageBadge = ({ transaction }: TransactionsPageBadgeProps) => {
  if (transaction.type == TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-primary hover:bg-muted font-bold">
        <CircleIcon className="mr-2 fill-primary" size={10}></CircleIcon>
        Depósito
      </Badge>
    );
  }
  if (transaction.type == TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 text-danger font-bold hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10}></CircleIcon>
        Despesas
      </Badge>
    );
  }
  return (
    <Badge className="bg-white bg-opacity-10 text-white font-bold hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10}></CircleIcon>
      Investimento
    </Badge>
  );
};

export default TransactionsPageBadge;
