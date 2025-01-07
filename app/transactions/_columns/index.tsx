"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionsPageBadge from "../_components/type-badge";
import { Button } from "../../_components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "../../_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original } }) =>
      original.type ? (
        <TransactionsPageBadge transaction={original} />
      ) : (
        "Tipo desconhecido"
      ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original } }) =>
      TRANSACTION_CATEGORY_LABELS[original.category] ||
      "Categoria desconhecida",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[original.paymentMethod] ||
      "Método desconhecido",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original } }) => {
      if (!original.date) return "Data inválida";
      try {
        return new Date(original.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      } catch {
        return "Data inválida";
      }
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original } }) => {
      if (!original.amount) return "Valor inválido";
      try {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(original.amount));
      } catch {
        return "Valor inválido";
      }
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
