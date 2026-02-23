"use client";

import { updateDefaultAccount } from '@/actions/account';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

const AccountCard = ({account}) => {
const{name, type, balance,id, isDefault} = account;
  const router = useRouter();

  const{
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return;
    }

    const result = await updateDefaultFn(id);

    if (result?.success) {
      toast.success("Default account updated successfully");
      router.refresh();
      return;
    }

    toast.error(result?.error || "Failed to update default account");
  };


  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`} className="flex h-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="mt-auto pt-6 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard