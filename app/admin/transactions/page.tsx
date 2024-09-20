import DataTable from '@/app/features/transaction/DataTable';
import { columns } from '@/app/constants/transaction/columns';
import { getQueryFromSearchParams } from '@/app/utils/common';
import transactionService from '@/services/transactionServices';
import { Suspense } from 'react';
import OverlayLoading from '@/app/components/loading/OverlayLoading';
import { PageProps } from '@/app/types/common';
import TitleCard from '@/app/components/Cards/TitleCard';

const Page = async ({searchParams}:PageProps) => {
  const query = getQueryFromSearchParams(searchParams)
  const data = await transactionService.fetchList(query);

  return (
    <TitleCard title={"Transactions"}>
      <Suspense fallback={<OverlayLoading/>}>
        <DataTable data={data?.data?.transactions || []} columns={columns} totalRows={data?.data?.totalTransactions || 0}/>
      </Suspense>
    </TitleCard>
  )
}

export default Page
