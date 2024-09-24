import DataTable from '@/app/features/transaction/DataTable';
import { columns } from '@/app/constants/request/columns';
import { getQueryFromSearchParams } from '@/app/utils/common';
import requestService from '@/services/requestServices';
import { Suspense } from 'react';
import OverlayLoading from '@/app/components/loading/OverlayLoading';
import { PageProps, RequestData, ServiceResponse } from '@/app/types/common';
import TitleCard from '@/app/components/Cards/TitleCard';

const Page = async ({searchParams}:PageProps) => {
  const query = getQueryFromSearchParams(searchParams)
  const res = await requestService.fetchList<ServiceResponse<RequestData>>(query);
  const listData = res.data?.data || [];
  const total = res.data?.total || 0;
  
  return (
    <TitleCard title={"Requests"}>
      <Suspense fallback={<OverlayLoading/>}>
        <DataTable data={listData} columns={columns} totalRows={total}/>
      </Suspense>
    </TitleCard>
  )
}

export default Page
