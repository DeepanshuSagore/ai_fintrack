import React, { Suspense } from 'react'
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getUserAccounts, getDashboardData } from '@/actions/dashboard';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import { BudgetProgress } from './_components/budget-progress';
import { DashboardOverview } from './_components/transaction-overview';

async function DashboardPage() {

  const accounts = await getUserAccounts();

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id)
  }

    const transactions = await getDashboardData();


  return( 
    <div className="px-5">
      {/* Budget Progress */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* OverView */}
      <div className="mt-6">
        <Suspense>
          <DashboardOverview
            accounts={accounts}
            transactions={transactions || []}
          />
        </Suspense>
      </div>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <CreateAccountDrawer>
         <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed h-full flex">
          <CardContent className="flex flex-1 flex-col items-center justify-center text-muted-foreground py-0">
            <Plus className="h-10 w-10 mb-2"/>
            <p className='text-sm font-medium'>Add New Account</p>
          </CardContent>
         </Card>
        </CreateAccountDrawer>

        {accounts.length>0 && 
          accounts?.map((account)=>{
          return <AccountCard key={account.id} account={account} />;
        })}
      </div>
    </div>
  );
};

export default DashboardPage;